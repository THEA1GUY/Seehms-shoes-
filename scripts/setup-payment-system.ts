import 'dotenv/config'
import { turso } from '../lib/turso'

async function updateOrdersAndCreateSettings() {
    console.log('📊 Updating database schema...\n')

    try {
        // Add payment columns to orders table
        await turso.execute(`
            ALTER TABLE orders ADD COLUMN payment_proof TEXT
        `)
        console.log('✅ Added payment_proof column to orders')

        await turso.execute(`
            ALTER TABLE orders ADD COLUMN payment_method_details TEXT
        `)
        console.log('✅ Added payment_method_details column to orders')

        // Create payment settings table
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS payment_settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bank_name TEXT NOT NULL,
                account_name TEXT NOT NULL,
                account_number TEXT NOT NULL,
                bank_code TEXT,
                is_active BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log('✅ Created payment_settings table')

        // Insert default bank details
        await turso.execute({
            sql: `INSERT INTO payment_settings (bank_name, account_name, account_number, bank_code) 
                  VALUES (?, ?, ?, ?)`,
            args: ['First Bank', 'Seehms Shoes Limited', '1234567890', '011']
        })
        console.log('✅ Inserted default bank details')

        console.log('\n🎉 Database updated successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error updating database:', error)
        process.exit(1)
    }
}

updateOrdersAndCreateSettings()
