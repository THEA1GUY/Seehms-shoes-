import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Returns & Refunds | Seehms Shoes",
    description: "Our 30-day return policy and refund process",
}

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Returns & Refunds
                    </h1>

                    <div className="space-y-8">
                        <section className="bg-primary/10 p-6 rounded-xl border border-primary/20">
                            <h2 className="text-2xl font-heading font-bold mb-4">30-Day Return Policy</h2>
                            <p className="text-muted-foreground">
                                Not satisfied with your purchase? We offer a hassle-free 30-day return policy. If you're not completely happy with your shoes, return them for a full refund or exchange.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Return Conditions</h2>
                            <div className="glass-card p-6 rounded-xl">
                                <ul className="space-y-3 text-muted-foreground">
                                    <li>✓ Items must be unworn and in original condition</li>
                                    <li>✓ Original packaging and tags must be intact</li>
                                    <li>✓ Return within 30 days of delivery</li>
                                    <li>✓ Proof of purchase required</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">How to Return</h2>
                            <div className="space-y-4">
                                <div className="glass-card p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Step 1: Contact Us</h3>
                                    <p className="text-muted-foreground">Email support@seemsshoes.com with your order number</p>
                                </div>
                                <div className="glass-card p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Step 2: Get Return Label</h3>
                                    <p className="text-muted-foreground">We'll send you a prepaid return shipping label</p>
                                </div>
                                <div className="glass-card p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Step 3: Ship It Back</h3>
                                    <p className="text-muted-foreground">Pack the item securely and drop it off at any courier location</p>
                                </div>
                                <div className="glass-card p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Step 4: Get Refund</h3>
                                    <p className="text-muted-foreground">Refund processed within 5-7 business days of receiving the return</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Exchanges</h2>
                            <p className="text-muted-foreground mb-4">
                                Need a different size or color? Exchanges are free and processed faster than returns. Contact us to arrange an exchange.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Refund Method</h2>
                            <p className="text-muted-foreground">
                                Refunds are issued to the original payment method. Bank transfers typically take 3-5 business days to reflect in your account.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
