"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Star, Filter, Grid, List, Search } from "lucide-react"
import Link from "next/link"
import { getProducts, getCategories, type Product } from "@/app/actions"

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
]

interface ProductCatalogProps {
  category?: string
}

export function ProductCatalog({ category }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 50000000]) // Max 50 million Naira
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // Data fetching
  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([
        getProducts({ category: selectedCategory === 'all' ? undefined : selectedCategory, sort: sortBy, query: searchQuery }),
        getCategories()
      ])
      setProducts(prods)
      setCategories(cats as any)
    }
    loadData()
  }, [selectedCategory, sortBy, searchQuery])

  // Get unique filter options from fetched products
  const uniqueColors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colors || []))), [products])
  const uniqueSizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizes || []))).sort((a: any, b: any) => a - b), [products])
  const uniqueBrands = useMemo(() => Array.from(new Set(products.map((p) => p.brand || ''))), [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (product.categories && product.categories.name.toLowerCase() !== selectedCategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Color filter
      if (selectedColors.length > 0 && !(product.colors || []).some((color: string) => selectedColors.includes(color))) {
        return false;
      }

      // Size filter
      if (selectedSizes.length > 0 && !(product.sizes || []).some((size: number) => selectedSizes.includes(size))) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange, selectedColors, selectedSizes, selectedBrands, products])

  const handleColorToggle = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handleSizeToggle = (size: number) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 50000000])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedBrands([])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="font-medium">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <h3 className="font-medium">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <h3 className="font-medium">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={50000000} min={0} step={100000} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <h3 className="font-medium">Colors</h3>
        <div className="grid grid-cols-3 gap-2">
          {uniqueColors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleColorToggle(color)}
              />
              <label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <h3 className="font-medium">Sizes</h3>
        <div className="grid grid-cols-4 gap-2">
          {uniqueSizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => handleSizeToggle(size)}
              className="h-8"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <h3 className="font-medium">Brands</h3>
        <div className="space-y-2">
          {uniqueBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">
          {selectedCategory === "all" ? "All Products" : categories.find((c) => c.name.toLowerCase() === selectedCategory)?.name}
        </h1>
        <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Card className="p-6">
            <FilterContent />
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <Card
                    className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${viewMode === "list" ? "flex flex-row" : ""
                      }`}
                  >
                    <Link href={`/product/${product.id}`} className={`relative block ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <div
                        className={`overflow-hidden ${viewMode === "list" ? "aspect-square rounded-l-lg" : "aspect-square rounded-t-lg"}`}
                      >
                        <img
                          src={product.colorVariants && product.colorVariants.length > 0 && product.colorVariants[0].image
                            ? product.colorVariants[0].image
                            : (product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg")}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {product.badge && (
                        <Badge
                          className={`absolute top-3 left-3 ${product.badge === "Sale"
                            ? "bg-secondary text-secondary-foreground"
                            : product.badge === "New"
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary text-primary-foreground"
                            }`}
                        >
                          {product.badge}
                        </Badge>
                      )}
                    </Link>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className={`space-y-3 ${viewMode === "list" ? "flex-1 p-6" : "p-4"}`}>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {product.categories ? product.categories.name : 'Uncategorized'}
                        </p>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating || 0) ? "text-accent fill-current" : "text-muted-foreground/30"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-lg">₦{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">₦{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1">
                        {(product.colors || []).slice(0, 4).map((color: string, index: number) => (
                          <div
                            key={color}
                            className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${color === "White"
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
                                          : color === "Green"
                                            ? "bg-green-500"
                                            : color === "Yellow"
                                              ? "bg-yellow-400"
                                              : color === "Pink"
                                                ? "bg-pink-400"
                                                : color === "Olive"
                                                  ? "bg-green-700"
                                                  : "bg-gray-300"
                              }`}
                            title={color}
                          />
                        ))}
                        {(product.colors || []).length > 4 && (
                          <span className="text-xs text-muted-foreground">+{(product.colors || []).length - 4}</span>
                        )}
                      </div>

                      {viewMode === "list" && (
                        <div className="pt-2">
                          <Button className="w-full" asChild>
                            <Link href={`/product/${product.id}`}>Select Options</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}