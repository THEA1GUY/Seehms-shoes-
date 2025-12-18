import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CategoryTiles } from "@/components/category-tiles"
import { FeaturedProducts } from "@/components/featured-products"

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CategoryTiles />
        {/* @ts-expect-error Async Server Component */}
        <FeaturedProducts />
      </main>
    </div>
  )
}
