-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Create Products Table
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
);

-- Create Variants Table (for color/size inventory tracking)
CREATE TABLE IF NOT EXISTS variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    color TEXT NOT NULL,
    size INTEGER NOT NULL,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Default Categories
INSERT OR IGNORE INTO categories (id, name) VALUES 
    (1, 'Sneakers'),
    (2, 'Boots'),
    (3, 'Sandals'),
    (4, 'Formal Shoes'),
    (5, 'Sports'),
    (6, 'Casual');

-- Insert Sample Products
INSERT OR IGNORE INTO products (id, name, price, original_price, rating, reviews, brand, category_id, images, colors, sizes, badge, description, material, features, stock) VALUES
    (1, 'Classic White Sneaker', 45000, 55000, 4.5, 128, 'Nike', 1, 
     '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"]',
     '["White", "Black"]',
     '[38, 39, 40, 41, 42, 43]',
     'Sale',
     'Classic white sneakers perfect for everyday wear',
     'Canvas and Rubber',
     '["Breathable canvas upper", "Cushioned insole", "Durable rubber outsole"]',
     50),
    (2, 'Urban Runner Pro', 65000, NULL, 4.8, 256, 'Adidas', 1,
     '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"]',
     '["Black", "Blue", "Red"]',
     '[39, 40, 41, 42, 43, 44]',
     'New',
     'High-performance running shoes for urban athletes',
     'Mesh and Synthetic',
     '["Responsive cushioning", "Breathable mesh", "Energy return technology"]',
     75);
