"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export function OrderSuccess() {
  const orderNumber = "SH" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          <h1 className="font-heading font-bold text-3xl">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h2 className="font-semibold text-xl mb-2">Order #{orderNumber}</h2>
              <p className="text-muted-foreground">A confirmation email has been sent to your email address.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="text-center space-y-2">
                <Package className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Processing</h3>
                <p className="text-sm text-muted-foreground">1-2 business days</p>
              </div>
              <div className="text-center space-y-2">
                <Truck className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Shipping</h3>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
              <div className="text-center space-y-2">
                <Mail className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-medium">Updates</h3>
                <p className="text-sm text-muted-foreground">Via email & SMS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
