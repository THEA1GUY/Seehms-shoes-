"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getPaymentSettings, updatePaymentSettings } from "@/app/payment-actions"
import { Loader2, CreditCard, CheckCircle } from "lucide-react"

export function PaymentSettings() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        bankName: "",
        accountName: "",
        accountNumber: "",
        bankCode: ""
    })

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        setIsLoading(true)
        const settings = await getPaymentSettings()
        if (settings) {
            setFormData({
                bankName: settings.bankName,
                accountName: settings.accountName,
                accountNumber: settings.accountNumber,
                bankCode: settings.bankCode || ""
            })
        }
        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setSuccess(false)

        const result = await updatePaymentSettings(formData)

        if (result.success) {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        }

        setIsSaving(false)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <CardTitle>Bank Account Settings</CardTitle>
                </div>
                <CardDescription>
                    Configure your bank account details for customer payments
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                            id="bankName"
                            placeholder="e.g., First Bank, GTBank, Access Bank"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                            id="accountName"
                            placeholder="e.g., Seehms Shoes Limited"
                            value={formData.accountName}
                            onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                            id="accountNumber"
                            placeholder="e.g., 1234567890"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bankCode">Bank Code (Optional)</Label>
                        <Input
                            id="bankCode"
                            placeholder="e.g., 011 for First Bank"
                            value={formData.bankCode}
                            onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                        />
                        <p className="text-sm text-muted-foreground">
                            Used for USSD and quick transfers
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Settings"
                            )}
                        </Button>
                        {success && (
                            <div className="flex items-center gap-2 text-primary">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">Settings saved!</span>
                            </div>
                        )}
                    </div>
                </form>

                {formData.accountNumber && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold mb-2">Preview (Customer View)</h3>
                        <div className="space-y-1 text-sm">
                            <p><strong>Bank:</strong> {formData.bankName}</p>
                            <p><strong>Account Name:</strong> {formData.accountName}</p>
                            <p><strong>Account Number:</strong> {formData.accountNumber}</p>
                            {formData.bankCode && (
                                <p><strong>Bank Code:</strong> {formData.bankCode}</p>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
