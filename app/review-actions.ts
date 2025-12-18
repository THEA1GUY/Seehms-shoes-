"use server"

import { turso } from "@/lib/turso"

export interface Review {
    id: number
    user_id: number
    product_id: number
    rating: number
    title: string | null
    comment: string | null
    verified_purchase: boolean
    created_at: string
    user_name?: string
}

export async function getProductReviews(productId: number) {
    try {
        const result = await turso.execute({
            sql: `
        SELECT r.*, u.name as user_name 
        FROM reviews r 
        LEFT JOIN users u ON r.user_id = u.id 
        WHERE r.product_id = ? 
        ORDER BY r.created_at DESC
      `,
            args: [productId]
        })

        return result.rows as unknown as Review[]
    } catch (error) {
        console.error("Get reviews error:", error)
        return []
    }
}

export async function submitReview(data: {
    userId: number
    productId: number
    rating: number
    title?: string
    comment?: string
}) {
    try {
        // Check if user already reviewed this product
        const existing = await turso.execute({
            sql: "SELECT id FROM reviews WHERE user_id = ? AND product_id = ?",
            args: [data.userId, data.productId]
        })

        if (existing.rows.length > 0) {
            return { success: false, error: "You have already reviewed this product" }
        }

        // Insert review
        await turso.execute({
            sql: `
        INSERT INTO reviews (user_id, product_id, rating, title, comment) 
        VALUES (?, ?, ?, ?, ?)
      `,
            args: [
                data.userId,
                data.productId,
                data.rating,
                data.title || null,
                data.comment || null
            ]
        })

        // Update product average rating
        await updateProductRating(data.productId)

        return { success: true }
    } catch (error) {
        console.error("Submit review error:", error)
        return { success: false, error: "Failed to submit review" }
    }
}

async function updateProductRating(productId: number) {
    try {
        const result = await turso.execute({
            sql: "SELECT AVG(rating) as avg_rating, COUNT(*) as review_count FROM reviews WHERE product_id = ?",
            args: [productId]
        })

        if (result.rows.length > 0) {
            const { avg_rating, review_count } = result.rows[0] as any

            await turso.execute({
                sql: "UPDATE products SET rating = ?, reviews = ? WHERE id = ?",
                args: [Math.round(avg_rating * 10) / 10, review_count, productId]
            })
        }
    } catch (error) {
        console.error("Update rating error:", error)
    }
}
