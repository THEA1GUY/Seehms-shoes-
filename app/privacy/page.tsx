import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy | Seehms Shoes",
    description: "Our commitment to protecting your privacy and personal information",
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mb-8">Last updated: December 17, 2024</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Introduction</h2>
                            <p className="text-muted-foreground">
                                At Seehms Shoes, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Information We Collect</h2>
                            <div className="space-y-3 text-muted-foreground">
                                <p><strong>Personal Information:</strong></p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Name and contact details (email, phone number)</li>
                                    <li>Shipping and billing addresses</li>
                                    <li>Payment information (processed securely through our payment provider)</li>
                                    <li>Order history and preferences</li>
                                </ul>
                                <p className="mt-4"><strong>Automatically Collected Information:</strong></p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Browser type and version</li>
                                    <li>Device information</li>
                                    <li>IP address</li>
                                    <li>Pages visited and time spent on site</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Respond to customer service requests</li>
                                <li>Improve our website and services</li>
                                <li>Send promotional emails (with your consent)</li>
                                <li>Prevent fraud and enhance security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All payment information is encrypted and processed through secure payment gateways.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Your Rights</h2>
                            <p className="text-muted-foreground mb-3">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Withdraw consent at any time</li>
                                <li>Unsubscribe from marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Cookies</h2>
                            <p className="text-muted-foreground">
                                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Third-Party Services</h2>
                            <p className="text-muted-foreground">
                                We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or serving you. These parties are obligated to keep your information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-heading font-bold mb-4">Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have questions about this privacy policy or wish to exercise your rights, please contact us at:
                            </p>
                            <div className="mt-3 text-muted-foreground">
                                <p>Email: privacy@seemsshoes.com</p>
                                <p>Phone: +234 (0) 800 SEEHMS</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
