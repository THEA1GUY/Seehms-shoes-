import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with Seehms Shoes customer support",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Have questions? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+234 800 000 0000"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us more about your inquiry..."
                                            rows={5}
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <Card className="glass-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Email Us</h3>
                                            <p className="text-muted-foreground">support@seemsshoes.com</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                We'll respond within 24 hours
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Call Us</h3>
                                            <p className="text-muted-foreground">+234 (0) 800 SEEHMS</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Mon-Sat, 9AM - 6PM WAT
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Visit Us</h3>
                                            <p className="text-muted-foreground">
                                                123 Victoria Island
                                                <br />
                                                Lagos, Nigeria
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Business Hours</h3>
                                            <p className="text-muted-foreground">
                                                Monday - Friday: 9AM - 6PM
                                                <br />
                                                Saturday: 10AM - 4PM
                                                <br />
                                                Sunday: Closed
                                            </p>
                                        </div>
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
