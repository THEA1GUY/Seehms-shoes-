import { notFound } from "next/navigation"
import Link from "next/link"
import { getOrderById, getPaymentSettings } from "@/app/payment-actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PaymentProofUpload } from "@/components/payment-proof-upload"
import { OrderSuccessActions } from "@/components/order-success-actions"
import { CheckCircle, Clock, Package, Truck, Home } from "lucide-react"

interface PageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ new?: string }>
}

export default async function OrderPage({ params, searchParams }: PageProps) {
    // Await the params and searchParams
    const { id } = await params
    const { new: isNew } = await searchParams

    const orderId = parseInt(id)

    if (isNaN(orderId)) {
        notFound()
    }

    const order = await getOrderById(orderId)
    const bankDetails = await getPaymentSettings()

    if (!order) {
        notFound()
    }

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'pending': return 1
            case 'processing': return 2
            case 'shipped': return 3
            case 'delivered': return 4
            case 'cancelled': return 0
            default: return 1
        }
    }

    const currentStep = getStatusStep(order.status)

    const steps = [
        { number: 1, label: "Order Placed", icon: CheckCircle },
        { number: 2, label: "Processing", icon: Package },
        { number: 3, label: "Shipped", icon: Truck },
        { number: 4, label: "Delivered", icon: Home },
    ]

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="container max-w-4xl mx-auto space-y-8">
                {/* Status Banners */}
                {isNew && (
                    <div className="bg-green-500/10 text-green-600 p-6 rounded-lg text-center space-y-2 border border-green-500/20">
                        <div className="flex justify-center">
                            <CheckCircle className="h-12 w-12" />
                        </div>
                        <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
                        <p>Your order #{order.order_number} has been recorded.</p>
                    </div>
                )}

                {/* ACTION REQUIRED: Payment Verification */}
                {(order.payment_status === 'pending') && (
                    <Card className="border-primary/50 shadow-lg bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl text-primary">
                                <Clock className="h-6 w-6" />
                                Action Required: Complete Payment
                            </CardTitle>
                            <CardDescription>
                                Please transfer the total amount and upload your proof of payment or transaction ID below to process your order.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {bankDetails && (
                                <div className="bg-background/80 p-4 rounded-lg border space-y-2">
                                    <p className="font-medium">Transfer ₦{order.total_amount.toLocaleString()} to:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Bank Name</p>
                                            <p className="font-semibold">{bankDetails.bankName}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Account Number</p>
                                            <p className="font-mono font-semibold text-lg">{bankDetails.accountNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Account Name</p>
                                            <p className="font-semibold">{bankDetails.accountName}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-background p-6 rounded-lg border">
                                <PaymentProofUpload orderId={orderId} />
                            </div>

                            <OrderSuccessActions
                                whatsappUrl={`https://api.whatsapp.com/send?phone=2348187908798&text=${encodeURIComponent(`Hello! I just placed order #${order.order_number}. Please verify my payment.`)}`}
                            />
                        </CardContent>
                    </Card>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Status & Payment */}
                    <div className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Order Status</CardTitle>
                                    <Badge variant={order.status === 'cancelled' ? 'destructive' : 'default'} className="capitalize">
                                        {order.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {/* Status Steps */}
                                    <div className="relative flex justify-between">
                                        {order.status !== 'cancelled' && (
                                            <div className="absolute top-4 left-0 w-full h-1 bg-muted -z-10" />
                                        )}
                                        {steps.map((step) => {
                                            const Icon = step.icon
                                            const isActive = currentStep >= step.number
                                            return (
                                                <div key={step.number} className="flex flex-col items-center gap-2 bg-background px-2">
                                                    <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center border-2
                            ${isActive
                                                            ? "bg-primary border-primary text-primary-foreground"
                                                            : "bg-background border-muted text-muted-foreground"}
                          `}>
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className={`text-xs ${isActive ? "font-medium" : "text-muted-foreground"}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Payment Section (Secondary/Historical) */}
                                    <div className="border-t pt-6">
                                        <h3 className="font-semibold mb-4">Payment Status</h3>

                                        {order.payment_status === 'pending' ? (
                                            <div className="text-sm text-center text-muted-foreground bg-muted p-4 rounded-lg">
                                                Waiting for payment proof upload (see above).
                                            </div>
                                        ) : order.payment_status === 'verifying' ? (
                                            <div className="bg-blue-500/10 text-blue-600 p-4 rounded-lg flex items-center gap-2">
                                                <Clock className="h-5 w-5" />
                                                <span className="font-medium">Payment verification in progress</span>
                                            </div>
                                        ) : (
                                            <div className="bg-green-500/10 text-green-600 p-4 rounded-lg flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5" />
                                                <span className="font-medium">Payment Received</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription>Order #{order.order_number}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    {order.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between items-start text-sm">
                                            <div>
                                                <p className="font-medium">{item.product_name}</p>
                                                <p className="text-muted-foreground">
                                                    Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                                                </p>
                                            </div>
                                            <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₦{order.total_amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {order.payment_method_details && (
                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold text-sm mb-2">Shipping Details</h4>
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            <p>{order.payment_method_details.customerName}</p>
                                            <p>{order.payment_method_details.customerPhone}</p>
                                            <p>{order.payment_method_details.shippingAddress.addressLine1}</p>
                                            <p>
                                                {order.payment_method_details.shippingAddress.city}, {order.payment_method_details.shippingAddress.state}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Link href="/shop" className="block">
                            <Button variant="outline" className="w-full">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
