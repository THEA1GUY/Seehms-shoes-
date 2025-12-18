"use server"

import { turso } from "@/lib/turso"

export async function getRecommendedProducts(productId: number, limit: number = 4) {
    try {
        // Get the current product to find its category
        const productResult = await turso.execute({
            sql: "SELECT category_id FROM products WHERE id = ?",
            args: [productId]
        })

        if (productResult.rows.length === 0) {
            return []
        }

        const categoryId = productResult.rows[0].category_id

        // Get similar products from the same category, excluding current product
        const result = await turso.execute({
            sql: `
        SELECT id, name, price, original_price, images, rating, badge
        FROM products 
        WHERE category_id = ? AND id != ?
        ORDER BY RANDOM()
        LIMIT ?
      `,
            args: [categoryId, productId, limit]
        })

        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            originalPrice: row.original_price,
            image: JSON.parse(row.images as string)[0] || null,
            rating: row.rating,
            badge: row.badge
        }))
    } catch (error) {
        console.error("Get recommendations error:", error)
        return []
    }
}

export async function getTrendingProducts(limit: number = 8) {
    try {
        const result = await turso.execute({
            sql: `
        SELECT id, name, price, original_price, images, rating, reviews, badge
        FROM products 
        ORDER BY reviews DESC, rating DESC
        LIMIT ?
      `,
            args: [limit]
        })

        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            originalPrice: row.original_price,
            image: JSON.parse(row.images as string)[0] || null,
            rating: row.rating,
            reviews: row.reviews,
            badge: row.badge
        }))
    } catch (error) {
        console.error("Get trending products error:", error)
        return []
    }
}
