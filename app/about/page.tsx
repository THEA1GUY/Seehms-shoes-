import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | Seehms Shoes",
    description: "Learn about Seehms Shoes - Nigeria's premier destination for quality footwear",
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        About Seehms Shoes
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Nigeria's premier destination for quality footwear since 2024
                    </p>
                </div>

                {/* Story Section */}
                <div className="max-w-4xl mx-auto space-y-12">
                    <section>
                        <h2 className="text-3xl font-heading font-bold mb-4">Our Story</h2>
                        <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                            <p>
                                Seehms Shoes was founded with a simple mission: to make premium footwear accessible to everyone in Nigeria. We believe that great shoes shouldn't be a luxury - they're a necessity for comfort, confidence, and style.
                            </p>
                            <p>
                                What started as a small collection has grown into a curated selection of the world's best shoe brands, all available at competitive prices with fast, reliable delivery across Nigeria.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold mb-4">What We Offer</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="glass-card p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
                                <p className="text-muted-foreground">
                                    100% genuine products from authorized distributors. Every shoe is verified for authenticity.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                                <p className="text-muted-foreground">
                                    Quick delivery across Nigeria. Most orders arrive within 3-5 business days.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                                <p className="text-muted-foreground">
                                    30-day return policy. Not satisfied? We'll make it right, no questions asked.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-heading font-bold mb-4">Our Values</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Quality First</h3>
                                <p>We only stock shoes we'd wear ourselves. Every product is carefully selected for quality and durability.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Customer Satisfaction</h3>
                                <p>Your happiness is our success. We're here to help you find the perfect fit, every time.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">Fair Pricing</h3>
                                <p>Premium doesn't mean expensive. We work hard to offer the best prices without compromising on quality.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-primary/5 p-8 rounded-2xl">
                        <h2 className="text-3xl font-heading font-bold mb-4">Get in Touch</h2>
                        <p className="text-muted-foreground mb-4">
                            Have questions? We'd love to hear from you.
                        </p>
                        <div className="space-y-2 text-muted-foreground">
                            <p><strong>Email:</strong> support@seemsshoes.com</p>
                            <p><strong>Phone:</strong> +234 (0) 800 SEEHMS</p>
                            <p><strong>Hours:</strong> Monday - Saturday, 9AM - 6PM WAT</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
