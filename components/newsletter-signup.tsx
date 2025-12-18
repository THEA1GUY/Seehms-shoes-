"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeNewsletter } from "@/app/newsletter-actions"
import { Loader2, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        const result = await subscribeNewsletter(email)

        if (result.success) {
            setSuccess(true)
            setEmail("")
        } else {
            setError(result.error || "Failed to subscribe")
        }

        setIsLoading(false)
    }

    if (success) {
        return (
            <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Thanks for subscribing!</span>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
                <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </form>
    )
}
