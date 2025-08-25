import { Navigation } from "@/components/navigation"
import { OrderSuccess } from "@/components/order-success"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <OrderSuccess />
      </main>
    </div>
  )
}
