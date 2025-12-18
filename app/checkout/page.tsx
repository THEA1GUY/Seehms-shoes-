"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { createOrder, getPaymentSettings } from "@/app/payment-actions"
import { Loader2, ShoppingBag, CreditCard, AlertCircle } from "lucide-react"
import { PaymentProofUpload } from "@/components/payment-proof-upload"

export default function CheckoutPage() {
  const router = useRouter()
  const { items: cart, clearCart, cartTotal } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [bankDetails, setBankDetails] = useState<any>(null)

  const [paymentProof, setPaymentProof] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: ""
  })

  useEffect(() => {
    // Check if cart is empty
    if (cart.length === 0 && !isSuccess) {
      router.push("/shop")
      return
    }

    // Get user if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData(prev => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || ""
      }))
    }

    // Load bank details
    loadBankDetails()
  }, [cart, router])

  const loadBankDetails = async () => {
    const settings = await getPaymentSettings()
    setBankDetails(settings)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Enforce Payment Proof
    if (!paymentProof && !transactionId) {
      alert("Please upload payment proof or enter a transaction ID to continue.")
      return
    }

    setIsLoading(true)

    const orderData = {
      userId: user?.id || null,
      items: cart.map(item => ({
        productId: typeof item.id === 'string' ? parseInt(item.id) : item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color
      })),
      shippingAddress: {
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode
      },
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      transactionId: transactionId || undefined,
      paymentProof: paymentProof || undefined
    }

    const result = await createOrder(orderData)

    if (result.success) {
      setIsSuccess(true)
      clearCart()
      router.push(`/order/${result.orderId}?new=true`)
    } else {
      alert("Failed to create order. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isLoading || (!paymentProof && !transactionId)}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Order...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                    {!paymentProof && !transactionId && (
                      <p className="text-sm text-destructive text-center flex items-center justify-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Payment proof required
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Payment Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                        </p>
                        {item.size && (
                          <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                        )}
                      </div>
                      <p className="font-semibold">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₦{cartTotal?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="glass-card border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <CardTitle>Payment Method: Bank Transfer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {bankDetails && (
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <p className="text-sm font-semibold">Transfer to:</p>
                      <div className="space-y-1 text-sm">
                        <p><strong>Bank:</strong> {bankDetails.bankName}</p>
                        <p><strong>Account Name:</strong> {bankDetails.accountName}</p>
                        <p><strong>Account Number:</strong> {bankDetails.accountNumber}</p>
                        {bankDetails.bankCode && (
                          <p><strong>Bank Code:</strong> {bankDetails.bankCode}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">Upload Proof (Required)</h4>
                    <PaymentProofUpload
                      onChange={(data) => {
                        setPaymentProof(data.proofUrl || null)
                        setTransactionId(data.transactionId || null)
                      }}
                    />
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Instructions:</p>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Make bank transfer of ₦{cartTotal?.toLocaleString() || '0'}</li>
                      <li>Upload proof or enter Transaction ID above</li>
                      <li>Click "Place Order" to finish</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
