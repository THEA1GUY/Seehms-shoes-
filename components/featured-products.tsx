import Link from "next/link"
import { getProducts } from "@/app/actions"
import { FeaturedProductsList } from "./featured-products-list"

export async function FeaturedProducts() {
  // Fetch featured products (simulated by sorting by rating or just taking top 4)
  const products = await getProducts({ sort: 'rating' })
  const featured = products.slice(0, 4)

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/20 relative">
      <div className="container mx-auto px-4">
        <FeaturedProductsList products={featured} />
      </div>
    </section>
  )
}
