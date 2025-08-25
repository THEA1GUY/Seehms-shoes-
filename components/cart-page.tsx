"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { Plus, Minus, X, ShoppingCart, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart()
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null)

  const shippingThreshold = 75
  const shippingCost = total >= shippingThreshold ? 0 : 9.99
  const discountAmount = appliedDiscount?.amount || 0
  const finalTotal = total + shippingCost - discountAmount

  const handleApplyDiscount = () => {
    // Mock discount codes
    const discountCodes: Record<string, number> = {
      WELCOME10: 10,
      SAVE20: 20,
      STUDENT15: 15,
    }

    if (discountCodes[discountCode.toUpperCase()]) {
      setAppliedDiscount({
        code: discountCode.toUpperCase(),
        amount: discountCodes[discountCode.toUpperCase()],
      })
      setDiscountCode("")
    } else {
      alert("Invalid discount code")
    }
  }

  const removeDiscount = () => {
    setAppliedDiscount(null)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground" />
          <div>
            <h1 className="font-heading font-bold text-3xl mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any shoes to your cart yet. Start shopping to fill it up!
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{itemCount} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.color}-${item.size}`}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">{item.brand}</p>
                        <p className="text-sm text-muted-foreground">
                          Color: {item.color} • Size: {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-heading font-semibold text-xl">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      {appliedDiscount.code}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-muted-foreground hover:text-destructive"
                        onClick={removeDiscount}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </span>
                    <span>-${appliedDiscount.amount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                {total < shippingThreshold && (
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                    <p className="text-sm text-accent-foreground">
                      Add ${(shippingThreshold - total).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Discount Code */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-medium">Discount Code</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button onClick={handleApplyDiscount} variant="outline">
                  Apply
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Try: WELCOME10, SAVE20, or STUDENT15</p>
              </div>
            </CardContent>
          </Card>

          {/* Continue Shopping */}
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
