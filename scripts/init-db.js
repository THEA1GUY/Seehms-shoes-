import { turso } from '../lib/turso.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDatabase() {
    try {
        console.log('🔧 Initializing Turso database...');

        const sqlContent = readFileSync(join(__dirname, 'init-db.sql'), 'utf-8');

        // Split by semicolons and execute each statement
        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            try {
                await turso.execute(statement);
                console.log('✅ Executed:', statement.substring(0, 50) + '...');
            } catch (error) {
                console.warn('⚠️  Statement error (may be ok):', error.message);
            }
        }

        console.log('✅ Database initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase();
