'use server'

import { turso } from "@/lib/turso";


export interface ColorVariant {
    color: string;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number; // camelCase
    rating?: number;
    reviews?: number;
    brand: string;
    category_id: number;
    images: string[];
    colors: string[];
    sizes: number[];
    badge?: string;
    categories?: { name: string };
    colorVariants?: ColorVariant[];
    // dynamic fields mapped
}

export async function getProducts(params?: { query?: string; category?: string; sort?: string }): Promise<Product[]> {
    let sql = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 1=1
  `;
    const args: any[] = [];

    if (params?.category && params.category !== 'all') {
        sql += ` AND LOWER(c.name) = ?`;
        args.push(params.category.toLowerCase());
    }

    if (params?.query) {
        sql += ` AND LOWER(p.name) LIKE ?`;
        args.push(`%${params.query.toLowerCase()}%`);
    }

    // Sorting
    if (params?.sort === 'price-low') {
        sql += ` ORDER BY p.price ASC`;
    } else if (params?.sort === 'price-high') {
        sql += ` ORDER BY p.price DESC`;
    } else if (params?.sort === 'rating') {
        sql += ` ORDER BY p.rating DESC`;
    } else if (params?.sort === 'newest') {
        sql += ` ORDER BY p.id DESC`;
    } else {
        // Default featured (by rating for now or id)
        sql += ` ORDER BY p.rating DESC`;
    }

    try {
        const result = await turso.execute({ sql, args });

        // Parse JSON fields and Map Helper
        const products = result.rows.map(row => ({
            ...row,
            id: Number(row.id),
            price: Number(row.price),
            originalPrice: row.original_price ? Number(row.original_price) : undefined, // Map snake to camel
            category_id: Number(row.category_id),
            images: JSON.parse(row.images as string || '[]'),
            colors: JSON.parse(row.colors as string || '[]'),
            sizes: JSON.parse(row.sizes as string || '[]'),
            colorVariants: JSON.parse(row.color_variants as string || '[]'),
            categories: { name: row.category_name as string }
        })) as unknown as Product[];

        return products;
    } catch (error) {
        console.error("Database Error:", error);
        // Fallback or rethrow
        return [];
    }
}


export async function getCategories() {
    try {
        const result = await turso.execute("SELECT * FROM categories");
        return result.rows;
    } catch (error) {
        console.error("Database Error:", error);
        return [];
    }
}

export async function removeProduct(id: number) {
    // Ideally verify admin session here
    try {
        await turso.execute({
            sql: "DELETE FROM products WHERE id = ?",
            args: [id]
        })
        return { success: true }
    } catch (e) {
        console.error("Delete Error", e)
        throw new Error("Failed to delete")
    }
}

export async function getProduct(id: number) {
    try {
        const result = await turso.execute({
            sql: "SELECT * FROM products WHERE id = ?",
            args: [id]
        })

        if (result.rows.length === 0) return null

        const row = result.rows[0];

        const safeParse = (val: any) => {
            if (!val) return [];
            if (typeof val === 'object') return val;
            try {
                return JSON.parse(val);
            } catch (e) {
                console.error("JSON Parse Error for value:", val, e);
                return [];
            }
        };

        return {
            ...row,
            images: safeParse(row.images),
            colors: safeParse(row.colors),
            sizes: safeParse(row.sizes),
            colorVariants: safeParse(row.color_variants),
        }
    } catch (e) {
        console.error("getProduct failed:", e)
        return null
    }
}

export async function upsertProduct(data: any) {
    // Simple validation could go here
    const isUpdate = !!data.id

    try {
        if (isUpdate) {
            await turso.execute({
                sql: `UPDATE products SET name=?, price=?, brand=?, category_id=?, images=?, colors=?, sizes=?, badge=?, color_variants=? WHERE id=?`,
                args: [
                    data.name, data.price, data.brand, data.category_id,
                    JSON.stringify(data.images || []), JSON.stringify(data.colors || []), JSON.stringify(data.sizes || []),
                    data.badge, JSON.stringify(data.colorVariants || []), data.id
                ]
            })
        } else {
            await turso.execute({
                sql: `INSERT INTO products (name, price, brand, category_id, images, colors, sizes, badge, color_variants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    data.name, data.price, data.brand, data.category_id,
                    JSON.stringify(data.images || []), JSON.stringify(data.colors || []), JSON.stringify(data.sizes || []),
                    data.badge, JSON.stringify(data.colorVariants || [])
                ]
            })
        }
        return { success: true }
    } catch (e) {
        console.error("Upsert Error", e)
        throw new Error("Failed to save product")
    }
}

