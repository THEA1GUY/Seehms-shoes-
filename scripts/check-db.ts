import 'dotenv/config'
import { turso } from '../lib/turso'

async function checkDatabase() {
    console.log('🔍 Checking database contents...\n')

    try {
        // Check products
        console.log('📦 Products:')
        const products = await turso.execute('SELECT id, name, price, category_id, images FROM products')
        console.log(`Found ${products.rows.length} products:`)
        products.rows.forEach(row => {
            console.log(`  - ID: ${row.id}, Name: ${row.name}, Price: ${row.price}, Category ID: ${row.category_id}`)
        })

        console.log('\n📁 Categories:')
        const categories = await turso.execute('SELECT * FROM categories')
        console.log(`Found ${categories.rows.length} categories:`)
        categories.rows.forEach(row => {
            console.log(`  - ID: ${row.id}, Name: ${row.name}`)
        })

        console.log('\n✅ Database check complete!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error checking database:', error)
        process.exit(1)
    }
}

checkDatabase()
