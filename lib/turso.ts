import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL?.replace(/^["'](.+)["']$/, '$1').trim();
const authToken = process.env.TURSO_AUTH_TOKEN?.replace(/^["'](.+)["']$/, '$1').trim();

export const turso = url
    ? createClient({
        url,
        authToken,
    })
    : {
        execute: async () => {
            throw new Error("TURSO_DATABASE_URL is not defined. Please check your .env file.");
        }
    } as unknown as ReturnType<typeof createClient>;

if (!url) {
    console.warn("TURSO_DATABASE_URL is not defined. Database features will not work.");
}
