import 'dotenv/config'
import { turso } from '../lib/turso'

async function run() {
    try {
        console.log("Fetching Product 6...")
        const result = await turso.execute({
            sql: "SELECT * FROM products WHERE id = ?",
            args: [6]
        })

        if (result.rows.length === 0) {
            console.log("Product 6 NOT FOUND in DB.")
            return
        }

        const row = result.rows[0]
        console.log("Raw Row Keys:", Object.keys(row))
        console.log("Row Data:", row)

        try {
            console.log("Parsing images:", JSON.parse(row.images as string || '[]'))
        } catch (e) { console.error("Failed to parse images:", e) }

        try {
            console.log("Parsing colors:", JSON.parse(row.colors as string || '[]'))
        } catch (e) { console.error("Failed to parse colors:", e) }

        try {
            console.log("Parsing color_variants (val):", row.color_variants)
            console.log("Parsing color_variants:", JSON.parse(row.color_variants as string || '[]'))
        } catch (e) { console.error("Failed to parse color_variants:", e) }

    } catch (e) {
        console.error("Script Error:", e)
    }
}
run()
