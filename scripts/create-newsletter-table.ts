import 'dotenv/config'
import { turso } from '../lib/turso'

async function createNewsletterTable() {
    console.log('📧 Creating newsletter_subscribers table...\n')

    try {
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT 1
            )
        `)
        console.log('✅ Created newsletter_subscribers table')

        console.log('\n🎉 Newsletter table created successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error creating table:', error)
        process.exit(1)
    }
}

createNewsletterTable()
