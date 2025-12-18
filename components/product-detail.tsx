"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

import { getProduct, type ColorVariant } from "@/app/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProductDetailProps {
  productId: number
}

import { ShoeLoader } from "@/components/shoe-loader"
// ... imports ...

export function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter()
  const [product, setProduct] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      console.log("Fetching product with ID:", productId)
      setIsLoading(true)
      try {
        const data = await getProduct(productId);
        console.log("Product Data received:", data)

        if (data) {
          setProduct(data);
          // Set initial color logic...
          const initialColor = data.colorVariants && data.colorVariants.length > 0
            ? data.colorVariants[0].color
            : (data.colors?.[0] || "");
          setSelectedColor(initialColor);
          setSelectedSize(data.sizes?.[0] || null);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <ShoeLoader text="Finding your perfect pair..." />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">We couldn't find the shoe you're looking for.</p>
        <Link href="/shop" className="mt-4 inline-block text-primary hover:underline">
          Return to Shop
        </Link>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size first");
      return;
    }

    // Try to find variant, but fallback to base product if needed for simple products
    const selectedVariant = product.variants && product.variants.length > 0
      ? product.variants.find((v: any) => v.color === selectedColor && v.size === selectedSize)
      : { stock: 999 }; // Default dummy variant if no specific variants 

    if (selectedVariant && selectedVariant.stock < quantity) {
      alert(`Only ${selectedVariant.stock} items available`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || "/placeholder.svg",
      color: selectedColor,
      size: selectedSize.toString(),
    });

    setQuantity(1);
    // Open cart is handled by addItem context
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size first");
      return;
    }

    // Try to find variant, but fallback to base product if needed for simple products
    const selectedVariant = product.variants && product.variants.length > 0
      ? product.variants.find((v: any) => v.color === selectedColor && v.size === selectedSize)
      : { stock: 999 };

    if (selectedVariant && selectedVariant.stock < quantity) {
      alert(`Only ${selectedVariant.stock} items available`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || "/placeholder.svg",
      color: selectedColor,
      size: selectedSize.toString(),
    });

    setQuantity(1);
    // Use router.push for client-side navigation to preserve state
    router.push("/checkout");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images?.[selectedImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-md overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-primary" : "border-transparent"
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
                  className={`${product.badge === "Sale"
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
                    className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-accent fill-current" : "text-muted-foreground/30"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating || 0} ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-3xl">₦{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">₦{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge variant="secondary" className="bg-secondary/20">
                  Save ₦{(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="font-medium">Color: {selectedColor}</h3>
            <div className="flex gap-2">
              {(product.colorVariants && product.colorVariants.length > 0
                ? product.colorVariants
                : (product.colors || []).map((c: string) => ({ color: c, image: "" }))
              ).map((variant: ColorVariant | { color: string; image: string }) => (
                <button
                  key={variant.color}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    // If this variant has an image, find it in the images array and set it as selected
                    if (variant.image && product.images) {
                      const imageIndex = product.images.indexOf(variant.image);
                      if (imageIndex !== -1) {
                        setSelectedImage(imageIndex);
                      }
                    }
                  }}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === variant.color ? "border-primary scale-110" : "border-white shadow-md"
                    } ${variant.color === "White"
                      ? "bg-white border-gray-300"
                      : variant.color === "Black"
                        ? "bg-black"
                        : variant.color === "Gray"
                          ? "bg-gray-400"
                          : variant.color === "Brown"
                            ? "bg-amber-700"
                            : variant.color === "Navy"
                              ? "bg-blue-900"
                              : variant.color === "Blue"
                                ? "bg-blue-500"
                                : variant.color === "Red"
                                  ? "bg-red-500"
                                  : "bg-gray-300"
                    }`}
                  title={variant.color}
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
              {(product.sizes || []).map((size: number) => (
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
            <Button variant="secondary" className="w-full" size="lg" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>


        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2"> {/* Changed grid-cols-3 to grid-cols-2 */}
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews || 0})</TabsTrigger>
            {/* Removed Shipping & Returns TabTrigger */}
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
                  {product.features?.map((feature: string, index: number) => (
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
                      <span>{(product.sizes || []).join(", ")}</span>
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
                {/* Reviews will be fetched dynamically */}
              </div>
            </div>
          </TabsContent>


        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="font-heading font-bold text-2xl mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Related products will be fetched dynamically */}
        </div>
      </div>
    </div>
  )
}