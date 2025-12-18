import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = process.env.ADMIN_EMAIL
                const password = process.env.ADMIN_PASSWORD

                console.log('🔐 Auth attempt:', {
                    providedEmail: credentials.email,
                    expectedEmail: email,
                    providedPassword: credentials.password,
                    expectedPassword: password,
                    match: credentials.email === email && credentials.password === password
                })

                if (!email || !password) {
                    console.error('❌ Missing admin credentials in environment variables')
                    throw new Error("Missing admin credentials in environment variables")
                }

                if (credentials.email === email && credentials.password === password) {
                    console.log('✅ Authentication successful')
                    return { id: "1", email: email, name: "Admin" }
                }

                console.log('❌ Authentication failed - credentials do not match')
                return null
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // After login, redirect to admin dashboard
            if (url === baseUrl + "/auth/signin" || url === "/auth/signin") {
                return baseUrl + "/admin"
            }
            // Allows relative callback URLs
            if (url.startsWith("/")) return baseUrl + url
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith('/admin')

            if (isOnAdmin) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }

            // Allow access to other pages
            return true
        },
    },
    trustHost: true,
})
