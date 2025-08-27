import { Navigation } from "@/components/navigation"
import { ProductCatalog } from "@/components/product-catalog"
import { Suspense } from "react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductCatalog category={category} />
        </Suspense>
      </main>
    </div>
  )
}
