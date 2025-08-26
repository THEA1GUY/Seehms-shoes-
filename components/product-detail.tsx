"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

// Mock product data - in real app this would come from API/database
const allProducts = [
  {
    id: 1,
    name: "CloudWalk Pro Sneakers",
    category: "sneakers",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 124,
    image: "/premium-white-sneakers-athletic-shoes.png",
    badge: "Best Seller",
    colors: ["White", "Black", "Gray"],
    sizes: [7, 8, 9, 10, 11, 12],
    material: "Synthetic",
    brand: "CloudWalk",
    description:
      "Experience ultimate comfort with our CloudWalk Pro Sneakers. Featuring advanced cushioning technology and breathable materials, these sneakers are perfect for both athletic activities and casual wear.",
    features: [
      "Advanced cushioning technology",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Lightweight design",
      "Machine washable",
    ],
    images: [
      "/premium-white-sneakers-athletic-shoes.png",
      "/modern-athletic-sneakers-running-shoes.png",
      "/premium-white-sneakers-athletic-shoes.png",
    ],
  },
  {
    id: 2,
    name: "Executive Leather Oxfords",
    category: "corporate",
    price: 199.99,
    rating: 4.9,
    reviews: 89,
    image: "/black-leather-oxford-dress-shoes-professional.png",
    badge: "Premium",
    colors: ["Black", "Brown"],
    sizes: [7, 8, 9, 10, 11, 12],
    material: "Leather",
    brand: "Executive",
    description:
      "Elevate your professional wardrobe with these handcrafted leather oxfords. Made from premium full-grain leather with traditional construction techniques.",
    features: [
      "Full-grain leather upper",
      "Goodyear welt construction",
      "Leather sole with rubber heel",
      "Cushioned insole",
      "Classic oxford styling",
    ],
    images: [
      "/black-leather-oxford-dress-shoes-professional.png",
      "/professional-business-dress-shoes-leather.png",
      "/black-leather-oxford-dress-shoes-professional.png",
    ],
  },
  // Add more products as needed...
]

const relatedProducts = [
  {
    id: 3,
    name: "Comfort Plus Slides",
    price: 49.99,
    image: "/comfortable-slides-sandals-casual-footwear.png",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Adventure Sandals",
    price: 79.99,
    image: "/outdoor-adventure-sandals-hiking-footwear.png",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Classic Crocs",
    price: 59.99,
    image: "/colorful-crocs-comfortable-casual-shoes.png",
    rating: 4.5,
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely love these sneakers! Super comfortable and stylish. Perfect for my daily runs and casual outings.",
    verified: true,
  },
  {
    id: 2,
    name: "Mike R.",
    rating: 4,
    date: "1 month ago",
    comment: "Great quality shoes. The cushioning is excellent and they're very lightweight. Would recommend!",
    verified: true,
  },
  {
    id: 3,
    name: "Emma L.",
    rating: 5,
    date: "3 weeks ago",
    comment: "These are my new favorite sneakers. The fit is perfect and they look great with everything.",
    verified: false,
  },
]

interface ProductDetailProps {
  productId: number
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const product = allProducts.find((p) => p.id === productId)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      brand: product.brand,
      category: product.category,
    })

    // Reset selections after adding to cart
    setQuantity(1)
    alert("Added to cart!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.badge && (
                <Badge
                  className={`${
                    product.badge === "Sale"
                      ? "bg-secondary text-secondary-foreground"
                      : product.badge === "New"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                  }`}
                >
                  {product.badge}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground uppercase tracking-wide">{product.brand}</span>
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-accent fill-current" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-3xl">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="secondary" className="bg-secondary/20">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="font-medium">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${
                    selectedColor === color ? "border-primary scale-110" : "border-white shadow-md"
                  } ${
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
                              : color === "Blue"
                                ? "bg-blue-500"
                                : color === "Red"
                                  ? "bg-red-500"
                                  : "bg-gray-300"
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Size</h3>
              <Button variant="link" className="text-sm p-0 h-auto">
                Size Guide
              </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="aspect-square"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 ${isWishlisted ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => console.log("Share button clicked")}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="secondary" className="w-full" size="lg" onClick={() => console.log("Buy Now button clicked")}>
              Buy Now
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping over $75</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-3">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-xl mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Specifications</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Material:</span>
                      <span>{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Brand:</span>
                      <span>{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Sizes:</span>
                      <span>{product.sizes.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-xl">Customer Reviews</h3>
                <Button variant="outline" onClick={() => console.log("Write a Review button clicked")}>Write a Review</Button>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-accent fill-current" : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-semibold text-xl mb-3">Shipping Information</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• Free standard shipping on orders over $75</p>
                  <p>• Express shipping available for $9.99</p>
                  <p>• Standard delivery: 3-5 business days</p>
                  <p>• Express delivery: 1-2 business days</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-heading font-semibold text-xl mb-3">Returns & Exchanges</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• 30-day return policy</p>
                  <p>• Items must be in original condition</p>
                  <p>• Free return shipping for defective items</p>
                  <p>• Exchange available for different size/color</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="font-heading font-bold text-2xl mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
              <Card
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-medium group-hover:text-primary transition-colors">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${relatedProduct.price}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedProduct.rating)
                              ? "text-accent fill-current"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
