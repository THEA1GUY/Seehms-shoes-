import { Navigation } from "@/components/navigation"
import { ProductDetail } from "@/components/product-detail"
import { Suspense } from "react"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail productId={Number.parseInt(params.id)} />
        </Suspense>
      </main>
    </div>
  )
}
