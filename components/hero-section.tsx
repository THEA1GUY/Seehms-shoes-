import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20">
                <Star className="h-3 w-3 mr-1 fill-current" />
                New Collection Available
              </Badge>
              <h1 className="font-heading font-bold text-4xl lg:text-6xl leading-tight">
                Step Into
                <span className="text-primary block">Comfort & Style</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our curated collection of premium footwear designed for every lifestyle. From professional
                corporate shoes to casual comfort wear.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                View Collection
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Shoe Styles</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
              <img
                src="/modern-stylish-shoes-collection-lifestyle-photogra.png"
                alt="Premium shoe collection featuring sneakers, corporate shoes, and casual footwear"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Free Shipping
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
