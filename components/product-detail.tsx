"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw, Share2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

interface ProductDetailProps {
  productId: number
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<any | null>(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name)
        `)
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Error fetching product details:', error);
        setProduct(null);
      } else if (data) {
        setProduct(data);
        console.log("Fetched product data:", data);
        console.log("Product images array:", data?.images);
        console.log("Product image (single property):", data?.image);
        setSelectedColor(data.colors?.[0] || "");
        setSelectedSize(data.sizes?.[0] || null);
      }
    }
    fetchProduct();
    console.log("ProductDetail useEffect running for productId:", productId);
  }, [productId]);

  

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found or Loading...</h1>
        <p className="text-muted-foreground">Please wait or check if the product exists.</p>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a color and size");
      return;
    }

    const selectedVariant = product.variants.find(
      (v: any) => v.color === selectedColor && v.size === selectedSize
    );

    if (!selectedVariant) {
      alert("Selected variant not found.");
      return;
    }

    if (selectedVariant.stock < quantity) {
      alert(`Only ${selectedVariant.stock} items of this variant are in stock.`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images?.[0] || "/placeholder.svg",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      brand: product.brand,
      category: product.categories?.name,
      // Optionally, you can pass the variant's stock or other variant-specific details
      // variantStock: selectedVariant.stock,
    });

    // Reset selections after adding to cart
    setQuantity(1);
    alert("Added to cart!");
  };

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
                      i < Math.floor(product.rating || 0) ? "text-accent fill-current" : "text-muted-foreground/30"
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
              {(product.colors || []).map((color: string) => (
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
            <Button variant="secondary" className="w-full" size="lg" onClick={() => console.log("Buy Now button clicked")}>
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