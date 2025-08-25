import { Navigation } from "@/components/navigation"
import { CheckoutPage } from "@/components/checkout-page"

export default function Checkout() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <CheckoutPage />
      </main>
    </div>
  )
}
