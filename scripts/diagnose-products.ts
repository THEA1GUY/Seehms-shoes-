import 'dotenv/config'
import { turso } from '../lib/turso'

async function run() {
    try {
        console.log("Checking columns for 'products' table...")
        const info = await turso.execute("PRAGMA table_info(products)")

        const hasColorVariants = info.rows.some((row: any) => row.name === 'color_variants')

        if (hasColorVariants) {
            console.log("✅ 'color_variants' column EXISTS.")
        } else {
            console.log("❌ 'color_variants' column MISSING.")
            console.log("🛠️ Adding missing column 'color_variants'...")
            try {
                await turso.execute("ALTER TABLE products ADD COLUMN color_variants TEXT DEFAULT '[]'")
                console.log("✅ Column added successfully.")
            } catch (err: any) {
                console.error("❌ Failed to add column:", err.message)
            }
        }

    } catch (e) {
        console.error("Script Error:", e)
    }
}
run()
