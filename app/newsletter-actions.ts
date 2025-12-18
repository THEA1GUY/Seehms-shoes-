"use server"

import { turso } from "@/lib/turso"

export async function subscribeNewsletter(email: string) {
    try {
        // Check if already subscribed
        const existing = await turso.execute({
            sql: "SELECT id FROM newsletter_subscribers WHERE email = ?",
            args: [email]
        })

        if (existing.rows.length > 0) {
            return { success: false, error: "Email already subscribed" }
        }

        // Add subscriber
        await turso.execute({
            sql: "INSERT INTO newsletter_subscribers (email) VALUES (?)",
            args: [email]
        })

        return { success: true }
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return { success: false, error: "Failed to subscribe" }
    }
}

export async function getOrders() {
    try {
        const result = await turso.execute({
            sql: `
        SELECT o.*, u.email as customer_email, u.name as customer_name
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
      `
        })

        return result.rows.map(row => {
            const details = row.payment_method_details ? JSON.parse(row.payment_method_details as string) : {}
            return {
                id: row.id,
                orderNumber: row.order_number,
                status: row.status,
                totalAmount: row.total_amount,
                paymentStatus: row.payment_status,
                paymentProof: row.payment_proof,
                transactionId: row.transaction_id,
                customerEmail: row.customer_email || details.customerEmail,
                customerName: row.customer_name || details.customerName,
                customerPhone: details.customerPhone,
                shippingAddress: details.shippingAddress,
                createdAt: row.created_at
            }
        })
    } catch (error) {
        console.error("Get orders error:", error)
        return []
    }
}

import { sendOrderDeliveredEmail } from "@/lib/email"
import { getOrderById } from "@/app/payment-actions" // Need to fetch order details

// ... existing imports/code ...

export async function updateOrderStatus(orderId: number, status: string) {
    try {
        await turso.execute({
            sql: "UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [status, orderId]
        })

        if (status.toLowerCase() === 'delivered') {
            const order = await getOrderById(orderId);
            if (order) {
                const email = order.customer_email || order.payment_method_details?.customerEmail;
                const name = order.customer_name || order.payment_method_details?.customerName || "Customer";

                if (email) {
                    await sendOrderDeliveredEmail({
                        orderId,
                        customerEmail: email,
                        customerName: name
                    })
                }
            }
        }

        return { success: true }
    } catch (error) {
        console.error("Update order status error:", error)
        return { success: false, error: "Failed to update order" }
    }
}

export async function deleteOrder(orderId: number) {
    try {
        // Delete order items first (if no cascade)
        await turso.execute({
            sql: "DELETE FROM order_items WHERE order_id = ?",
            args: [orderId]
        })

        // Delete the order itself
        await turso.execute({
            sql: "DELETE FROM orders WHERE id = ?",
            args: [orderId]
        })

        return { success: true }
    } catch (error) {
        console.error("Delete order error:", error)
        return { success: false, error: "Failed to delete order" }
    }
}
