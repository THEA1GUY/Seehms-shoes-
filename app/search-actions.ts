"use server"

import { turso } from "@/lib/turso"

export async function searchProducts(query: string) {
    if (!query || query.length < 2) return []

    try {
        const result = await turso.execute({
            sql: `
        SELECT id, name, price, images, brand
        FROM products 
        WHERE name LIKE ? OR brand LIKE ? OR description LIKE ?
        LIMIT 10
      `,
            args: [`%${query}%`, `%${query}%`, `%${query}%`]
        })

        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            image: JSON.parse(row.images as string)[0] || null,
            brand: row.brand
        }))
    } catch (error) {
        console.error("Search error:", error)
        return []
    }
}

export async function getUniqueBrands() {
    try {
        const result = await turso.execute({
            sql: "SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL ORDER BY brand"
        })

        return result.rows.map(row => row.brand as string)
    } catch (error) {
        console.error("Get brands error:", error)
        return []
    }
}
