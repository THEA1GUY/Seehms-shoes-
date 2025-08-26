import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "CloudWalk Pro Sneakers",
    category: "Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 124,
    image: "/premium-white-sneakers-athletic-shoes.png",
    badge: "Best Seller",
    colors: ["White", "Black", "Gray"],
  },
  {
    id: 2,
    name: "Executive Leather Oxfords",
    category: "Corporate",
    price: 199.99,
    rating: 4.9,
    reviews: 89,
    image: "/black-leather-oxford-dress-shoes-professional.png",
    badge: "Premium",
    colors: ["Black", "Brown"],
  },
  {
    id: 3,
    name: "Comfort Plus Slides",
    category: "Slides",
    price: 49.99,
    rating: 4.7,
    reviews: 203,
    image: "/comfortable-slides-sandals-casual-footwear.png",
    badge: "New",
    colors: ["Black", "White", "Navy"],
  },
  {
    id: 4,
    name: "Adventure Sandals",
    category: "Sandals",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 156,
    image: "/outdoor-adventure-sandals-hiking-footwear.png",
    badge: "Sale",
    colors: ["Brown", "Black", "Olive"],
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-10 md:mb-12">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl">Featured Products</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Discover our most popular and highly-rated footwear, loved by thousands of customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <Badge
                  className={`absolute top-3 left-3 ${
                    product.badge === "Sale"
                      ? "bg-secondary text-secondary-foreground"
                      : product.badge === "New"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  {product.badge}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-accent fill-current" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  {product.colors.map((color, index) => (
                    <div
                      key={color}
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        color === "White"
                          ? "bg-white border-gray-300"
                          : color === "Black"
                            ? "bg-black"
                            : color === "Gray"
                              ? "bg-gray-400"
                              : color === "Brown"
                                ? "bg-amber-700"
                                : color === "Navy"
                                  ? "bg-blue-900"
                                  : color === "Olive"
                                    ? "bg-green-700"
                                    : "bg-gray-300"
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
