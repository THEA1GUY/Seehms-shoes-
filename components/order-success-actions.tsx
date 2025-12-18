"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface OrderSuccessActionsProps {
    whatsappUrl: string
}

export function OrderSuccessActions({ whatsappUrl }: OrderSuccessActionsProps) {
    const router = useRouter()
    const [countdown, setCountdown] = useState(20)

    useEffect(() => {
        // Attempt to open WhatsApp after 3 seconds
        const whatsappTimer = setTimeout(() => {
            window.location.href = whatsappUrl
        }, 3000)

        // Redirect to home after 20 seconds
        const homeTimer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(homeTimer)
                    router.push("/")
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearTimeout(whatsappTimer)
            clearInterval(homeTimer)
        }
    }, [whatsappUrl, router])

    return (
        <div className="bg-green-50/50 border border-green-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-green-800 flex items-center gap-2">
                🚀 Speed Up Verification
            </h3>
            <p className="text-sm text-green-700">
                Opening WhatsApp in 3 seconds...
                <br />
                Redirecting to Home in {countdown}s.
            </p>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] w-full font-bold text-white">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open WhatsApp & Send Proof Now
                </a>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
                If WhatsApp doesn't open automatically, click the button above.
            </p>
        </div>
    )
}
