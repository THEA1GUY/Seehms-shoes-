"use server"

import { turso } from "@/lib/turso"
import bcrypt from "bcryptjs"

export interface User {
    id: number
    email: string
    name: string | null
    phone: string | null
    created_at: string
}

export async function registerUser(data: {
    email: string
    password: string
    name?: string
    phone?: string
}) {
    try {
        // Check if user already exists
        const existing = await turso.execute({
            sql: "SELECT id FROM users WHERE email = ?",
            args: [data.email]
        })

        if (existing.rows.length > 0) {
            return { success: false, error: "Email already registered" }
        }

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, 10)

        // Create user
        await turso.execute({
            sql: `INSERT INTO users (email, password_hash, name, phone) VALUES (?, ?, ?, ?)`,
            args: [data.email, passwordHash, data.name || null, data.phone || null]
        })

        return { success: true }
    } catch (error) {
        console.error("Registration error:", error)
        return { success: false, error: "Failed to create account" }
    }
}

export async function loginUser(email: string, password: string) {
    try {
        const result = await turso.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: [email]
        })

        if (result.rows.length === 0) {
            return { success: false, error: "Invalid email or password" }
        }

        const user = result.rows[0]
        const passwordMatch = await bcrypt.compare(password, user.password_hash as string)

        if (!passwordMatch) {
            return { success: false, error: "Invalid email or password" }
        }

        // Return user data (excluding password)
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone
            } as User
        }
    } catch (error) {
        console.error("Login error:", error)
        return { success: false, error: "Login failed" }
    }
}

export async function getUser(userId: number) {
    try {
        const result = await turso.execute({
            sql: "SELECT id, email, name, phone, created_at FROM users WHERE id = ?",
            args: [userId]
        })

        if (result.rows.length === 0) {
            return null
        }

        return result.rows[0] as unknown as User
    } catch (error) {
        console.error("Get user error:", error)
        return null
    }
}

export async function updateUser(userId: number, data: {
    name?: string
    phone?: string
}) {
    try {
        await turso.execute({
            sql: `UPDATE users SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
            args: [data.name || null, data.phone || null, userId]
        })

        return { success: true }
    } catch (error) {
        console.error("Update user error:", error)
        return { success: false, error: "Failed to update profile" }
    }
}
