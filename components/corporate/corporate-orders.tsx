"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Building2, Users, Package, Calculator, Phone, Mail, CheckCircle, Clock, Plus, Minus } from "lucide-react"

const corporateProducts = [
  {
    id: 1,
    name: "Professional Oxford Shoes",
    category: "Corporate",
    price: 89.99,
    bulkPrice: 75.99,
    image: "/professional-oxford-corporate-shoes.png",
    minQuantity: 10,
  },
  {
    id: 2,
    name: "Business Loafers",
    category: "Corporate",
    price: 79.99,
    bulkPrice: 67.99,
    image: "/business-loafers-corporate-shoes.png",
    minQuantity: 10,
  },
  {
    id: 3,
    name: "Safety Work Boots",
    category: "Corporate",
    price: 129.99,
    bulkPrice: 109.99,
    image: "/safety-work-boots-corporate.png",
    minQuantity: 5,
  },
  {
    id: 4,
    name: "Comfort Slides (Bulk)",
    category: "Slides",
    price: 29.99,
    bulkPrice: 24.99,
    image: "/comfortable-slides-sandals-pool-shoes.png",
    minQuantity: 20,
  },
]

const pricingTiers = [
  { min: 10, max: 49, discount: "10%" },
  { min: 50, max: 99, discount: "15%" },
  { min: 100, max: 199, discount: "20%" },
  { min: 200, max: 499, discount: "25%" },
  { min: 500, max: null, discount: "30%" },
]

export function CorporateOrders() {
  const [activeTab, setActiveTab] = useState("overview")
  const [bulkItems, setBulkItems] = useState<Array<{ id: number; quantity: number; size: string }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addToBulkOrder = (productId: number) => {
    const existingItem = bulkItems.find((item) => item.id === productId)
    if (existingItem) {
      setBulkItems(bulkItems.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setBulkItems([...bulkItems, { id: productId, quantity: 1, size: "US 9" }])
    }
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setBulkItems(bulkItems.filter((item) => item.id !== productId))
    } else {
      setBulkItems(bulkItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const calculateTotal = () => {
    return bulkItems.reduce((total, item) => {
      const product = corporateProducts.find((p) => p.id === item.id)
      return total + (product ? product.bulkPrice * item.quantity : 0)
    }, 0)
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      const response = await fetch("/api/corporate/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          bulkItems,
          totalAmount: calculateTotal(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert(
          `Quote request submitted successfully! Quote ID: ${result.quoteId}. We'll contact you within ${result.estimatedResponse}.`,
        )
        setBulkItems([]) // Clear bulk order
      } else {
        alert("Failed to submit quote request. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCorporateAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())

      const response = await fetch("/api/corporate/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        alert(
          `Corporate account application submitted successfully! Application ID: ${result.applicationId}. Review time: ${result.estimatedReview}.`,
        )
      } else {
        alert("Failed to submit application. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-heading font-bold">Corporate & Bulk Orders</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Equip your team with quality footwear. Special pricing for bulk orders and corporate accounts.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="quote">Get Quote</TabsTrigger>
              <TabsTrigger value="account">Corporate Account</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <Users className="h-12 w-12 mx-auto text-primary mb-2" />
                    <CardTitle>Volume Discounts</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Save up to 30% on bulk orders. The more you order, the more you save.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Package className="h-12 w-12 mx-auto text-primary mb-2" />
                    <CardTitle>Custom Solutions</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Tailored footwear solutions for your industry and team requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <CheckCircle className="h-12 w-12 mx-auto text-primary mb-2" />
                    <CardTitle>Dedicated Support</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      Personal account manager and priority customer service for corporate clients.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Tiers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Volume Pricing Tiers
                  </CardTitle>
                  <CardDescription>Automatic discounts based on order quantity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {pricingTiers.map((tier, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary mb-2">{tier.discount}</div>
                          <div className="text-sm text-muted-foreground">
                            {tier.min}-{tier.max || "∞"} pairs
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Our Corporate Team</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">1-800-SHOE-BIZ</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">corporate@shoehaven.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-6PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Industries We Serve</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Healthcare",
                        "Hospitality",
                        "Manufacturing",
                        "Retail",
                        "Construction",
                        "Food Service",
                        "Corporate Offices",
                        "Education",
                      ].map((industry) => (
                        <Badge key={industry} variant="outline" className="justify-center">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">Corporate Product Catalog</h2>
                <p className="text-muted-foreground">Professional footwear designed for workplace environments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {corporateProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-md mb-4"></div>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Regular Price:</span>
                          <span className="text-sm line-through">${product.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Bulk Price:</span>
                          <span className="text-lg font-bold text-primary">${product.bulkPrice}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Min. order: {product.minQuantity} pairs</p>
                      </div>
                      <Button className="w-full" onClick={() => addToBulkOrder(product.id)}>
                        Add to Bulk Order
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bulk Order Summary */}
              {bulkItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Current Bulk Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bulkItems.map((item) => {
                        const product = corporateProducts.find((p) => p.id === item.id)
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{product?.name}</p>
                              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <span className="w-20 text-right font-medium">
                                ${((product?.bulkPrice || 0) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total:</span>
                      <span className="text-2xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab("quote")}>
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="quote" className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">Request a Quote</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll provide a custom quote within 24 hours
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input id="companyName" required />
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="food-service">Food Service</SelectItem>
                            <SelectItem value="corporate">Corporate Offices</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employees">Number of Employees</Label>
                          <Input id="employees" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="orderQuantity">Estimated Order Quantity</Label>
                          <Input id="orderQuantity" type="number" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="requirements">Specific Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Please describe your footwear needs, preferred styles, safety requirements, etc."
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeline">Desired Timeline</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-month">Within 1 month</SelectItem>
                            <SelectItem value="3-months">Within 3 months</SelectItem>
                            <SelectItem value="6-months">Within 6 months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1k">Under $1,000</SelectItem>
                            <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="over-25k">Over $25,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Quote Request..." : "Submit Quote Request"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2">Corporate Account Benefits</h2>
                <p className="text-muted-foreground">Unlock exclusive benefits with a corporate account</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Volume pricing discounts</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Priority customer support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Flexible payment terms</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Custom product solutions</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Consolidated billing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apply for Corporate Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleCorporateAccountSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="corpCompanyName">Company Name</Label>
                        <Input id="corpCompanyName" name="companyName" required />
                      </div>
                      <div>
                        <Label htmlFor="corpEmail">Business Email</Label>
                        <Input id="corpEmail" name="corpEmail" type="email" required />
                      </div>
                      <div>
                        <Label htmlFor="corpPhone">Phone Number</Label>
                        <Input id="corpPhone" name="corpPhone" type="tel" />
                      </div>
                      <div>
                        <Label htmlFor="annualVolume">Expected Annual Volume</Label>
                        <Select name="annualVolume">
                          <SelectTrigger>
                            <SelectValue placeholder="Select volume" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100-500">100-500 pairs</SelectItem>
                            <SelectItem value="500-1000">500-1,000 pairs</SelectItem>
                            <SelectItem value="1000-5000">1,000-5,000 pairs</SelectItem>
                            <SelectItem value="5000+">5,000+ pairs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting Application..." : "Apply for Corporate Account"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
