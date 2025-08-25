import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Slides",
    href: "/shop/slides",
    image: "/comfortable-slides-sandals-pool-shoes.png",
    description: "Comfort for every step",
    itemCount: "120+ styles",
    featured: false,
  },
  {
    name: "Crocs",
    href: "/shop/crocs",
    image: "/colorful-crocs-comfortable-casual-shoes.png",
    description: "Iconic comfort wear",
    itemCount: "85+ styles",
    featured: true,
  },
  {
    name: "Sneakers",
    href: "/shop/sneakers",
    image: "/modern-athletic-sneakers-running-shoes.png",
    description: "Performance meets style",
    itemCount: "200+ styles",
    featured: true,
  },
  {
    name: "Corporate",
    href: "/shop/corporate",
    image: "/professional-business-dress-shoes-leather.png",
    description: "Professional excellence",
    itemCount: "95+ styles",
    featured: false,
  },
  {
    name: "Sandals",
    href: "/shop/sandals",
    image: "/summer-sandals-beach-footwear-casual.png",
    description: "Summer essentials",
    itemCount: "150+ styles",
    featured: false,
  },
]

export function CategoryTiles() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect footwear for every occasion. From professional meetings to weekend adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href} className="group">
              <Card
                className={`overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 ${
                  index === 1 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="relative">
                  <div className={`aspect-[4/3] ${index === 1 ? "lg:aspect-[2/1]" : ""} overflow-hidden`}>
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={`${category.name} collection`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {category.featured && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">Popular</Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Explore Collection</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-xl group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">{category.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">{category.itemCount}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
