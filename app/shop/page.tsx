import { Navigation } from "@/components/navigation"
import { ProductCatalog } from "@/components/product-catalog"
import { Suspense } from "react"

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductCatalog />
        </Suspense>
      </main>
    </div>
  )
}
