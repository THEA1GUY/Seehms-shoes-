import { Navigation } from "@/components/navigation"
import { ProductDetail } from "@/components/product-detail"
import { Suspense } from "react"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail productId={Number.parseInt(id)} />
        </Suspense>
      </main>
    </div>
  )
}
