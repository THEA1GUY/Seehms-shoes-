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
    const [proofUrl, setProofUrl] = useState<string | null>(null)
    const [submittedId, setSubmittedId] = useState<string | null>(null)

    const isDirectSubmit = !!orderId

    const handleUpload = async (result: any) => {
        if (result.event !== "success") return

        setIsUploading(true)
        const url = result.info.secure_url
        setProofUrl(url)

        if (onChange) onChange({ proofUrl: url, transactionId: transactionId || undefined })

        if (isDirectSubmit) {
            const response = await submitPaymentDetails(orderId, { proofUrl: url })
            if (response.success) {
                if (onUploadSuccess) onUploadSuccess()
                router.refresh()
            } else {
                alert("Failed to save payment proof. Please try again.")
                setProofUrl(null)
            }
        }
        setIsUploading(false)
    }

    const handleSubmitId = async () => {
        if (!transactionId.trim()) return

        if (onChange) onChange({ proofUrl: proofUrl || undefined, transactionId: transactionId })
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

    // Input change handler for checkout mode real-time updates
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setTransactionId(val)
        if (!isDirectSubmit && onChange) {
            onChange({ proofUrl: proofUrl || undefined, transactionId: val })
        }
    }

    if (proofUrl || submittedId) {
        return (
            <div className="space-y-4">
                <div className="bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Payment details submitted successfully!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    We will verify your payment shortly.
                </p>
                {proofUrl && (
                    <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border">
                        <img src={proofUrl} alt="Payment Proof" className="object-cover w-full h-full" />
                    </div>
                )}
                {submittedId && (
                    <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground">Transaction ID:</p>
                        <p className="font-mono">{submittedId}</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label>Option 1: Upload Payment Proof</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Upload className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold">Upload Receipt Image</h3>
                        <p className="text-sm text-muted-foreground">
                            Upload a screenshot or photo of your transfer
                        </p>
                    </div>

                    <CldUploadWidget
                        uploadPreset="seemsshoes_upload"
                        onSuccess={handleUpload}
                        options={{
                            maxFiles: 1,
                            resourceType: "image",
                            clientAllowedFormats: ["image"],
                            maxFileSize: 5000000,
                        }}
                    >
                        {({ open }) => {
                            return (
                                <Button
                                    onClick={() => open()}
                                    disabled={isUploading}
                                    variant="outline"
                                    className="w-full"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            Select Image
                                        </>
                                    )}
                                </Button>
                            )
                        }}
                    </CldUploadWidget>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or enter details
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <Label htmlFor="transactionId">Option 2: Enter Transaction ID</Label>
                <div className="flex gap-2">
                    <Input
                        id="transactionId"
                        placeholder="e.g. TRX-123456789"
                        value={transactionId}
                        onChange={handleIdChange}
                        disabled={isUploading}
                    />
                    {isDirectSubmit && (
                        <Button onClick={handleSubmitId} disabled={isUploading || !transactionId.trim()}>
                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    If you cannot upload an image, please paste the transaction reference ID from your bank app here.
                </p>
            </div>
        </div>
    )
}
