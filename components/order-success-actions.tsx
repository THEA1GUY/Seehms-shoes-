"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface OrderSuccessActionsProps {
    whatsappUrl: string
}

import { MessageCircle } from "lucide-react"

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
        <div className="bg-green-50/50 border border-green-200 rounded-lg p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-[#25D366] p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-green-900 text-lg">
                    Get approved quicker with WhatsApp
                </h3>
            </div>

            <p className="text-sm text-green-800 leading-relaxed">
                Opening WhatsApp to confirm your order in <span className="font-bold">3 seconds</span>...
                <br />
                Redirecting back to Home in <span className="font-bold">{countdown}s</span>.
            </p>

            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] w-full font-bold text-white py-6 shadow-md transition-all hover:scale-[1.02]">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                >
                    <MessageCircle className="h-5 w-5" />
                    Get Approved Quicker via WhatsApp
                </a>
            </Button>

            <p className="text-xs text-green-600/70 text-center font-medium">
                If the app doesn't open automatically, click the button above to send your proof.
            </p>
        </div>
    )
}
