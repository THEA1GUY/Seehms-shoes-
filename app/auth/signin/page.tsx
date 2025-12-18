'use client'

import { useActionState } from 'react'
import { authenticate } from '@/app/lib/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function Page() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
            <Card className="w-full max-w-md border-0 shadow-2xl glass-card">
                <CardHeader className="space-y-1 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-heading">Admin Access</CardTitle>
                    <CardDescription>Enter your secure credentials to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            {errorMessage && (
                                <div className="text-sm text-red-500 font-medium animate-pulse">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
                            {isPending ? "Authenticating..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
