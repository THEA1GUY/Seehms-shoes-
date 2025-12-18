"use client"

import { useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitPaymentDetails } from "@/app/payment-actions"
import { Loader2, Upload, CheckCircle, Image as ImageIcon, Send } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentProofUploadProps {
    orderId?: number
    onUploadSuccess?: () => void
    onChange?: (data: { proofUrl?: string, transactionId?: string }) => void
}

export function PaymentProofUpload({ orderId, onUploadSuccess, onChange }: PaymentProofUploadProps) {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)
    const [transactionId, setTransactionId] = useState("")
    const [submittedId, setSubmittedId] = useState<string | null>(null)

    const isDirectSubmit = !!orderId

    const handleSubmitId = async () => {
        if (!transactionId.trim()) return

        if (onChange) onChange({ transactionId: transactionId })
        setSubmittedId(transactionId)

        if (isDirectSubmit) {
            setIsUploading(true)
            const response = await submitPaymentDetails(orderId, { transactionId: transactionId })

            if (response.success) {
                if (onUploadSuccess) onUploadSuccess()
                router.refresh()
            } else {
                alert("Failed to save transaction ID. Please try again.")
                setSubmittedId(null)
            }
            setIsUploading(false)
        }
    }

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTransactionId(val)
        if (!isDirectSubmit && onChange) {
            onChange({ transactionId: val })
        }
    }

    if (submittedId) {
        return (
            <div className="space-y-4 pt-2">
                <div className="bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium text-sm">Transaction details submitted!</span>
                </div>
                <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase">Transaction ID</p>
                        <p className="font-mono text-sm">{submittedId}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <Label htmlFor="transactionId" className="text-sm">Transaction ID Reference</Label>
            <div className="flex gap-2">
                <Input
                    id="transactionId"
                    placeholder="e.g. TRX-123456789"
                    value={transactionId}
                    onChange={handleIdChange}
                    disabled={isUploading}
                    className="h-10"
                />
                {isDirectSubmit && (
                    <Button onClick={handleSubmitId} disabled={isUploading || !transactionId.trim()} className="h-10 px-3">
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                )}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
                Please paste the transaction reference ID from your bank app or receipt here for instant verification.
            </p>
        </div>
    )
}
