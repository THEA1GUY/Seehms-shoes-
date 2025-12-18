"use server"

import { turso } from "@/lib/turso"
import { sendOrderConfirmationEmail, sendPaymentApprovedEmail } from "@/lib/email"

export interface Order {
    id: number
    order_number: string
    status: string
    total_amount: number
    payment_status: string
    payment_proof: string | null
    created_at: string
    items: any[]
    payment_method_details: any
    customer_email?: string
    customer_name?: string
}

export interface PaymentSettings {
    id: number
    bankName: string
    accountName: string
    accountNumber: string
    bankCode: string | null
    isActive: boolean
}

export async function getPaymentSettings() {
    try {
        const result = await turso.execute({
            sql: "SELECT * FROM payment_settings WHERE is_active = 1 LIMIT 1"
        })

        if (result.rows.length === 0) {
            return null
        }

        const row = result.rows[0]
        return {
            id: row.id,
            bankName: row.bank_name,
            accountName: row.account_name,
            accountNumber: row.account_number,
            bankCode: row.bank_code,
            isActive: Boolean(row.is_active)
        } as PaymentSettings
    } catch (error) {
        console.error("Get payment settings error:", error)
        return null
    }
}

export async function updatePaymentSettings(data: {
    bankName: string
    accountName: string
    accountNumber: string
    bankCode?: string
}) {
    try {
        // Get current active setting
        const current = await getPaymentSettings()

        if (current) {
            // Update existing
            await turso.execute({
                sql: `UPDATE payment_settings 
              SET bank_name = ?, account_name = ?, account_number = ?, bank_code = ?, updated_at = CURRENT_TIMESTAMP 
              WHERE id = ?`,
                args: [data.bankName, data.accountName, data.accountNumber, data.bankCode || null, current.id]
            })
        } else {
            // Insert new
            await turso.execute({
                sql: `INSERT INTO payment_settings (bank_name, account_name, account_number, bank_code) 
              VALUES (?, ?, ?, ?)`,
                args: [data.bankName, data.accountName, data.accountNumber, data.bankCode || null]
            })
        }

        return { success: true }
    } catch (error) {
        console.error("Update payment settings error:", error)
        return { success: false, error: "Failed to update payment settings" }
    }
}

export async function createOrder(data: {
    userId: number | null
    items: Array<{ productId: number; productName: string; quantity: number; price: number; size?: string; color?: string }>
    shippingAddress: {
        addressLine1: string
        addressLine2?: string
        city: string
        state: string
        postalCode?: string
    }
    customerInfo: {
        name: string
        email: string
        phone: string
    }
    transactionId?: string
    paymentProof?: string
}) {
    try {
        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

        // Calculate total
        const totalAmount = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        // Create shipping address
        let addressId = null
        if (data.userId) {
            const addressResult = await turso.execute({
                sql: `INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code) 
              VALUES (?, ?, ?, ?, ?, ?)`,
                args: [
                    data.userId,
                    data.shippingAddress.addressLine1,
                    data.shippingAddress.addressLine2 || null,
                    data.shippingAddress.city,
                    data.shippingAddress.state,
                    data.shippingAddress.postalCode || null
                ]
            })
            addressId = addressResult.lastInsertRowid
        }

        // Create order
        const orderResult = await turso.execute({
            sql: `INSERT INTO orders (
        user_id, order_number, status, total_amount, shipping_address_id, 
        payment_method, payment_status, payment_method_details,
        payment_proof, transaction_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [
                data.userId || null,
                orderNumber,
                'pending',
                totalAmount,
                addressId || null,
                'bank_transfer',
                (data.transactionId || data.paymentProof) ? 'verifying' : 'pending',
                JSON.stringify({
                    customerName: data.customerInfo.name,
                    customerEmail: data.customerInfo.email,
                    customerPhone: data.customerInfo.phone,
                    shippingAddress: data.shippingAddress
                }),
                data.paymentProof || null,
                data.transactionId || null
            ]
        })

        const orderId = orderResult.lastInsertRowid
        if (orderId === undefined) {
            throw new Error("Failed to create order: No order ID returned")
        }

        // Create order items
        for (const item of data.items) {
            await turso.execute({
                sql: `INSERT INTO order_items (order_id, product_id, product_name, quantity, price, size, color) 
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    orderId,
                    item.productId,
                    item.productName,
                    item.quantity,
                    item.price,
                    item.size || null,
                    item.color || null
                ]
            })
        }

        // SEND EMAIL
        try {
            await sendOrderConfirmationEmail({
                orderId: Number(orderId),
                customerName: data.customerInfo.name,
                customerEmail: data.customerInfo.email,
                totalAmount,
                items: data.items.map(i => ({ product_name: i.productName, quantity: i.quantity, price: i.price })),
                trackingToken: orderNumber
            })
        } catch (emailErr) {
            console.error("Failed to send order email, but order created:", emailErr)
        }

        return { success: true, orderId: Number(orderId), orderNumber }
    } catch (error) {
        console.error("Create order error:", error)
        return { success: false, error: "Failed to create order" }
    }
}

export async function submitPaymentDetails(orderId: number, data: { proofUrl?: string, transactionId?: string }) {
    try {
        if (!data.proofUrl && !data.transactionId) {
            return { success: false, error: "Either proof or transaction ID is required" }
        }

        await turso.execute({
            sql: "UPDATE orders SET payment_proof = ?, transaction_id = ?, payment_status = 'verifying', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [data.proofUrl || null, data.transactionId || null, orderId]
        })

        return { success: true }
    } catch (error) {
        console.error("Submit payment details error:", error)
        return { success: false, error: "Failed to submit payment details" }
    }
}

export async function uploadPaymentProof(orderId: number, proofUrl: string) {
    return submitPaymentDetails(orderId, { proofUrl })
}

export async function verifyPayment(orderId: number, approved: boolean) {
    try {
        const newStatus = approved ? 'paid' : 'pending'
        const orderStatus = approved ? 'processing' : 'pending'

        await turso.execute({
            sql: "UPDATE orders SET payment_status = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [newStatus, orderStatus, orderId]
        })

        if (approved) {
            // Retrieve customer details to send email
            const order = await getOrderById(orderId);
            if (order && order.customer_email && order.customer_name) {
                sendPaymentApprovedEmail({
                    orderId: order.id,
                    customerEmail: order.customer_email,
                    customerName: order.customer_name
                }).catch(e => console.error("Approved email failed", e))
            } else if (order && order.payment_method_details) {
                // Fallback if user is guest (data in payment_method_details JSON)
                const details = order.payment_method_details; // Parsed by getOrderById
                if (details.customerEmail) {
                    sendPaymentApprovedEmail({
                        orderId: order.id,
                        customerEmail: details.customerEmail,
                        customerName: details.customerName || "Customer"
                    }).catch(e => console.error("Approved email failed", e))
                }
            }
        }

        return { success: true }
    } catch (error) {
        console.error("Verify payment error:", error)
        return { success: false, error: "Failed to verify payment" }
    }
}

export async function getOrderById(orderId: number): Promise<Order | null> {
    try {
        const orderResult = await turso.execute({
            sql: `SELECT o.*, u.email as customer_email, u.name as customer_name
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.id = ?`,
            args: [orderId]
        })

        if (orderResult.rows.length === 0) {
            return null
        }

        const order = orderResult.rows[0] as any

        // Get order items
        const itemsResult = await turso.execute({
            sql: "SELECT * FROM order_items WHERE order_id = ?",
            args: [orderId]
        })

        return {
            ...order,
            items: itemsResult.rows,
            payment_method_details: order.payment_method_details ? JSON.parse(order.payment_method_details as string) : null
        }
    } catch (error) {
        console.error("Get order error:", error)
        return null
    }
}
