import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import { products, categories } from "../lib/products.ts";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
    console.error("Error: TURSO_DATABASE_URL is not defined in .env.local");
    process.exit(1);
}

const client = createClient({
    url,
    authToken,
});

async function main() {
    console.log("🌱 Starting database seed...");

    try {
        // 1. Create Tables
        console.log("Creating tables...");

        // Categories Table
        await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );
    `);

        // Products Table
        // Note: SQLite doesn't have array types natively. We'll store arrays as JSON strings or use related tables.
        // For simplicity in this demo, accessing JSON in SQLite (Turso supports generic JSON functions) is good.
        // But for "Vector" later, we will add a separate table or column.
        await client.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        original_price REAL,
        rating REAL,
        reviews INTEGER,
        brand TEXT,
        category_id INTEGER,
        images TEXT, -- JSON array
        colors TEXT, -- JSON array
        sizes TEXT,  -- JSON array
        badge TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);

        // 2. Insert Data
        console.log("Inserting categories...");
        for (const cat of categories) {
            await client.execute({
                sql: "INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)",
                args: [cat.id, cat.name],
            });
        }

        console.log("Inserting products...");
        for (const p of products) {
            // Find category ID by name match from the file
            const catMatch = categories.find(c => c.name === p.categories.name);
            const catId = catMatch ? catMatch.id : null;

            await client.execute({
                sql: `
          INSERT OR REPLACE INTO products (
            id, name, price, original_price, rating, reviews, brand, category_id, 
            images, colors, sizes, badge
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
                args: [
                    p.id,
                    p.name,
                    p.price,
                    p.originalPrice || null,
                    p.rating,
                    p.reviews,
                    p.brand,
                    catId,
                    JSON.stringify(p.images),
                    JSON.stringify(p.colors || []),
                    JSON.stringify(p.sizes || []),
                    p.badge || null
                ],
            });
        }

        console.log("✅ Database seeded successfully!");
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

main();
