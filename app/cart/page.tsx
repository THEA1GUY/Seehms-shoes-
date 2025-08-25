import { Navigation } from "@/components/navigation"
import { CartPage } from "@/components/cart-page"

export default function Cart() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <CartPage />
      </main>
    </div>
  )
}
