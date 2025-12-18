import 'dotenv/config'
import { turso } from '../lib/turso'

const sampleProducts = [
    {
        name: "Nike Air Max 270",
        brand: "Nike",
        category_id: 1, // Sneakers
        price: 45000,
        original_price: 55000,
        description: "The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/nike-air-max-270-white",
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/nike-air-max-270-side"
        ],
        colors: ["White", "Black", "Blue"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        badge: "Best Seller",
        rating: 4.8,
        reviews: 156,
        color_variants: JSON.stringify([
            { color: "White", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/nike-air-max-270-white" },
            { color: "Black", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/nike-air-max-270-black" },
            { color: "Blue", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/nike-air-max-270-blue" }
        ])
    },
    {
        name: "Adidas Ultraboost 22",
        brand: "Adidas",
        category_id: 2, // Running
        price: 52000,
        original_price: 65000,
        description: "Experience energy return like never before. The Ultraboost 22 features responsive Boost cushioning and a Primeknit+ upper for adaptive support during your runs.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/adidas-ultraboost-white"
        ],
        colors: ["White", "Black", "Gray"],
        sizes: [38, 39, 40, 41, 42, 43, 44],
        badge: "New Arrival",
        rating: 4.9,
        reviews: 203,
        color_variants: JSON.stringify([
            { color: "White", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/adidas-ultraboost-white" },
            { color: "Black", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/adidas-ultraboost-black" }
        ])
    },
    {
        name: "Converse Chuck Taylor All Star",
        brand: "Converse",
        category_id: 1, // Sneakers
        price: 18000,
        original_price: 22000,
        description: "The iconic Chuck Taylor All Star. A timeless classic that's been a cultural icon for decades. Canvas upper with rubber toe cap and signature ankle patch.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/converse-chuck-taylor-black"
        ],
        colors: ["Black", "White", "Red"],
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        badge: "Classic",
        rating: 4.7,
        reviews: 892,
        color_variants: JSON.stringify([
            { color: "Black", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/converse-chuck-taylor-black" },
            { color: "White", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/converse-chuck-taylor-white" }
        ])
    },
    {
        name: "Puma RS-X³",
        brand: "Puma",
        category_id: 1, // Sneakers
        price: 35000,
        description: "Bold, unapologetic style meets comfort. The RS-X³ features a chunky silhouette with mesh and synthetic leather overlays for a retro-futuristic look.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/puma-rsx-multicolor"
        ],
        colors: ["White", "Black", "Navy"],
        sizes: [39, 40, 41, 42, 43, 44],
        badge: "Trending",
        rating: 4.5,
        reviews: 78,
        color_variants: JSON.stringify([
            { color: "White", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/puma-rsx-white" }
        ])
    },
    {
        name: "New Balance 574",
        brand: "New Balance",
        category_id: 1, // Sneakers
        price: 28000,
        original_price: 35000,
        description: "The 574 is a true icon. Combining comfort, durability, and classic style, it's perfect for everyday wear with its ENCAP midsole cushioning.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/newbalance-574-gray"
        ],
        colors: ["Gray", "Navy", "Brown"],
        sizes: [38, 39, 40, 41, 42, 43, 44, 45],
        badge: "Best Value",
        rating: 4.6,
        reviews: 234,
        color_variants: JSON.stringify([
            { color: "Gray", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/newbalance-574-gray" }
        ])
    },
    {
        name: "Vans Old Skool",
        brand: "Vans",
        category_id: 1, // Sneakers
        price: 22000,
        description: "The Vans classic. Featuring the iconic side stripe, padded collars for support and flexibility, and signature rubber waffle outsoles.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/vans-oldskool-black"
        ],
        colors: ["Black", "White", "Navy"],
        sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
        badge: "Skate Classic",
        rating: 4.8,
        reviews: 567,
        color_variants: JSON.stringify([
            { color: "Black", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/vans-oldskool-black" }
        ])
    },
    {
        name: "Clarks Desert Boot",
        brand: "Clarks",
        category_id: 3, // Boots
        price: 42000,
        original_price: 50000,
        description: "The original Desert Boot. Crafted from premium suede with a crepe sole, this timeless design has been a wardrobe staple since 1950.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/clarks-desert-boot-brown"
        ],
        colors: ["Brown", "Black"],
        sizes: [40, 41, 42, 43, 44, 45],
        badge: "Heritage",
        rating: 4.7,
        reviews: 145,
        color_variants: JSON.stringify([
            { color: "Brown", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/clarks-desert-boot-brown" }
        ])
    },
    {
        name: "Timberland 6-Inch Premium Boot",
        brand: "Timberland",
        category_id: 3, // Boots
        price: 65000,
        description: "The iconic Timberland boot. Waterproof leather, padded collar, and durable rubber lug outsole make this perfect for any weather.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/timberland-6inch-wheat"
        ],
        colors: ["Brown", "Black"],
        sizes: [40, 41, 42, 43, 44, 45, 46],
        badge: "Waterproof",
        rating: 4.9,
        reviews: 423,
        color_variants: JSON.stringify([
            { color: "Brown", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/timberland-6inch-wheat" }
        ])
    },
    {
        name: "Asics Gel-Kayano 29",
        brand: "Asics",
        category_id: 2, // Running
        price: 48000,
        original_price: 58000,
        description: "Maximum stability and comfort for long-distance running. Features GEL technology cushioning and engineered mesh upper for breathability.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/asics-gel-kayano-blue"
        ],
        colors: ["Blue", "Black", "White"],
        sizes: [39, 40, 41, 42, 43, 44, 45],
        badge: "Runner's Choice",
        rating: 4.8,
        reviews: 189,
        color_variants: JSON.stringify([
            { color: "Blue", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/asics-gel-kayano-blue" }
        ])
    },
    {
        name: "Reebok Classic Leather",
        brand: "Reebok",
        category_id: 1, // Sneakers
        price: 24000,
        description: "Soft garment leather upper with a die-cut EVA midsole for lightweight cushioning. A true classic that never goes out of style.",
        images: [
            "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/reebok-classic-white"
        ],
        colors: ["White", "Black"],
        sizes: [38, 39, 40, 41, 42, 43, 44],
        badge: "Retro",
        rating: 4.6,
        reviews: 312,
        color_variants: JSON.stringify([
            { color: "White", image: "https://res.cloudinary.com/dwq65rdhg/image/upload/v1/seemsshoes/reebok-classic-white" }
        ])
    }
];

async function seedProducts() {
    console.log('🌱 Seeding products database...\n')

    try {
        // Clear existing products (except keep the test one if you want)
        console.log('Clearing existing products...')
        await turso.execute('DELETE FROM products WHERE price < 1000000') // Keep the 34M test product

        console.log(`\nInserting ${sampleProducts.length} products...\n`)

        for (const product of sampleProducts) {
            await turso.execute({
                sql: `INSERT INTO products (
          name, brand, category_id, price, original_price, description,
          images, colors, sizes, badge, rating, reviews, color_variants
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                args: [
                    product.name,
                    product.brand,
                    product.category_id,
                    product.price,
                    product.original_price || null,
                    product.description,
                    JSON.stringify(product.images),
                    JSON.stringify(product.colors),
                    JSON.stringify(product.sizes),
                    product.badge || null,
                    product.rating || null,
                    product.reviews || null,
                    product.color_variants
                ]
            })
            console.log(`✅ Added: ${product.name} - ₦${product.price.toLocaleString()}`)
        }

        console.log(`\n🎉 Successfully seeded ${sampleProducts.length} products!`)
        process.exit(0)
    } catch (error) {
        console.error('❌ Error seeding products:', error)
        process.exit(1)
    }
}

seedProducts()
