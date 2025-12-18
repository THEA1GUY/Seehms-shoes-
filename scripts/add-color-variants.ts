import 'dotenv/config'
import { turso } from '../lib/turso'

async function addColorVariantsColumn() {
    console.log('🔧 Adding color_variants column to products table...\n')

    try {
        // Add the new column
        await turso.execute(`
            ALTER TABLE products ADD COLUMN color_variants TEXT DEFAULT '[]'
        `)
        console.log('✅ Added color_variants column')

        console.log('\n🎉 Database migration complete!')
        process.exit(0)
    } catch (error: any) {
        if (error.message?.includes('duplicate column') || error.message?.includes('already exists')) {
            console.log('ℹ️  Column already exists, skipping...')
            process.exit(0)
        }
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

addColorVariantsColumn()
