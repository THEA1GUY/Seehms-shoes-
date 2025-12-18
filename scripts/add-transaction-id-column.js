const { createClient } = require("@libsql/client");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
    process.exit(1);
}

const turso = createClient({
    url,
    authToken,
});

async function main() {
    try {
        console.log("Adding transaction_id column to orders table...");

        // Check if column exists (SQLite doesn't support IF NOT EXISTS for columns easily in one go, 
        // but adding it freely if missing is okay, checking manually is safer or just catch error)

        try {
            await turso.execute(`ALTER TABLE orders ADD COLUMN transaction_id TEXT`);
            console.log("Column added successfully.");
        } catch (e) {
            if (e.message.includes("duplicate column name")) {
                console.log("Column transaction_id already exists.");
            } else {
                throw e;
            }
        }

        console.log("Migration complete.");
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

main();
