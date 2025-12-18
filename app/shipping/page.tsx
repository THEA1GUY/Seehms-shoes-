import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Shipping Information | Seehms Shoes",
    description: "Learn about our shipping policies, delivery times, and costs",
}

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Shipping Information
                    </h1>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Delivery Areas</h2>
                            <p className="text-muted-foreground mb-4">
                                We currently deliver to all states in Nigeria. Major cities receive priority processing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Delivery Times</h2>
                            <div className="glass-card p-6 rounded-xl space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Lagos, Abuja, Port Harcourt</h3>
                                    <p className="text-muted-foreground">1-3 business days</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Other Major Cities</h3>
                                    <p className="text-muted-foreground">3-5 business days</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Remote Areas</h3>
                                    <p className="text-muted-foreground">5-7 business days</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Shipping Costs</h2>
                            <div className="glass-card p-6 rounded-xl">
                                <ul className="space-y-3 text-muted-foreground">
                                    <li>• <strong>Free Shipping:</strong> Orders over ₦50,000</li>
                                    <li>• <strong>Standard Shipping:</strong> ₦2,500 (Lagos, Abuja, PH)</li>
                                    <li>• <strong>Standard Shipping:</strong> ₦3,500 (Other states)</li>
                                    <li>• <strong>Express Shipping:</strong> ₦5,000 (Next day in Lagos)</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Order Tracking</h2>
                            <p className="text-muted-foreground">
                                Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier's tracking portal.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">International Shipping</h2>
                            <p className="text-muted-foreground">
                                We currently only ship within Nigeria. International shipping coming soon!
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
