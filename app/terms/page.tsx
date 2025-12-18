import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service | Seehms Shoes",
    description: "Terms and conditions for using Seehms Shoes",
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground mb-8">Last updated: December 17, 2024</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Agreement to Terms</h2>
                            <p className="text-muted-foreground">
                                By accessing and using Seehms Shoes website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Use License</h2>
                            <p className="text-muted-foreground mb-3">
                                Permission is granted to temporarily access the materials on Seehms Shoes website for personal, non-commercial use only. This license shall automatically terminate if you violate any of these restrictions.
                            </p>
                            <p className="text-muted-foreground">Under this license you may not:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for commercial purposes</li>
                                <li>Attempt to reverse engineer any software</li>
                                <li>Remove any copyright or proprietary notations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Product Information</h2>
                            <p className="text-muted-foreground">
                                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors and update information at any time without prior notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Orders and Pricing</h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>All prices are in Nigerian Naira (₦)</li>
                                <li>We reserve the right to refuse or cancel any order</li>
                                <li>Payment must be received before order processing</li>
                                <li>Promotional offers are subject to terms and conditions</li>
                                <li>Prices are subject to change without notice</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Shipping and Delivery</h2>
                            <p className="text-muted-foreground">
                                Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Returns and Refunds</h2>
                            <p className="text-muted-foreground">
                                Please refer to our Returns & Refunds page for detailed information about our 30-day return policy. Returns must meet specified conditions to be eligible for refund or exchange.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">User Accounts</h2>
                            <p className="text-muted-foreground">
                                You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. Notify us immediately of any unauthorized use.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                Seehms Shoes shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, even if we have been advised of the possibility of such damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Governing Law</h2>
                            <p className="text-muted-foreground">
                                These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website following any changes constitutes acceptance of those changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Contact Information</h2>
                            <p className="text-muted-foreground">
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="mt-3 text-muted-foreground">
                                <p>Email: legal@seemsshoes.com</p>
                                <p>Phone: +234 (0) 800 SEEHMS</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
