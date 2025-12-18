import 'dotenv/config'
import { turso } from '../lib/turso'

async function initDatabase() {
    console.log('🔧 Initializing Turso database...\n')

    try {
        // Create Categories Table
        console.log('Creating categories table...')
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE
            )
        `)
        console.log('✅ Categories table created')

        // Create Products Table
        console.log('Creating products table...')
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                original_price REAL,
                rating REAL DEFAULT 0,
                reviews INTEGER DEFAULT 0,
                brand TEXT DEFAULT 'Generic',
                category_id INTEGER NOT NULL,
                images TEXT NOT NULL DEFAULT '[]',
                colors TEXT NOT NULL DEFAULT '[]',
                sizes TEXT NOT NULL DEFAULT '[]',
                badge TEXT,
                description TEXT,
                material TEXT,
                features TEXT,
                stock INTEGER DEFAULT 0,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            )
        `)
        console.log('✅ Products table created')

        // Insert Default Categories
        console.log('Inserting default categories...')
        await turso.execute(`
            INSERT OR IGNORE INTO categories (id, name) VALUES 
                (1, 'Sneakers'),
                (2, 'Boots'),
                (3, 'Sandals'),
                (4, 'Formal Shoes'),
                (5, 'Sports'),
                (6, 'Casual')
        `)
        console.log('✅ Categories inserted')

        // Insert Sample Products
        console.log('Inserting sample products...')
        await turso.execute(`
            INSERT OR IGNORE INTO products (id, name, price, original_price, rating, reviews, brand, category_id, images, colors, sizes, badge, description, material, features, stock) VALUES
                (1, 'Classic White Sneaker', 45000, 55000, 4.5, 128, 'Nike', 1, 
                 '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"]',
                 '["White", "Black"]',
                 '[38, 39, 40, 41, 42, 43]',
                 'Sale',
                 'Classic white sneakers perfect for everyday wear',
                 'Canvas and Rubber',
                 '["Breathable canvas upper", "Cushioned insole", "Durable rubber outsole"]',
                 50)
        `)

        await turso.execute(`
            INSERT OR IGNORE INTO products (id, name, price, original_price, rating, reviews, brand, category_id, images, colors, sizes, badge, description, material, features, stock) VALUES
                (2, 'Urban Runner Pro', 65000, NULL, 4.8, 256, 'Adidas', 1,
                 '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"]',
                 '["Black", "Blue", "Red"]',
                 '[39, 40, 41, 42, 43, 44]',
                 'New',
                 'High-performance running shoes for urban athletes',
                 'Mesh and Synthetic',
                 '["Responsive cushioning", "Breathable mesh", "Energy return technology"]',
                 75)
        `)
        console.log('✅ Sample products inserted')

        console.log('\n🎉 Database initialized successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error initializing database:', error)
        process.exit(1)
    }
}

initDatabase()
