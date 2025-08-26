"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Eye, ArrowLeft, Upload } from "lucide-react"

const mockProducts = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "Sneakers",
    price: 89.99,
    stock: 45,
    status: "active",
    image: "/nike-air-max-sneakers.png",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    category: "Sneakers",
    price: 129.99,
    stock: 23,
    status: "active",
    image: "/adidas-ultraboost-sneakers.png",
  },
  {
    id: 3,
    name: "Classic Crocs",
    category: "Crocs",
    price: 49.99,
    stock: 67,
    status: "active",
    image: "/crocs-classic-clogs.png",
  },
  {
    id: 4,
    name: "Comfort Slides",
    category: "Slides",
    price: 29.99,
    stock: 0,
    status: "out_of_stock",
    image: "/comfortable-slides-sandals-pool-shoes.png",
  },
]

export function ProductManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setActiveTab("add")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="list">Product List</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold">Product Management</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="sneakers">Sneakers</SelectItem>
                      <SelectItem value="crocs">Crocs</SelectItem>
                      <SelectItem value="slides">Slides</SelectItem>
                      <SelectItem value="sandals">Sandals</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Products ({filteredProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-muted rounded-md"></div>
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-sm font-medium">${product.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">Stock: {product.stock}</p>
                          <Badge variant={product.status === "active" ? "default" : "destructive"}>
                            {product.status === "active" ? "Active" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => console.log(`View product ${product.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => console.log(`Edit product ${product.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => console.log(`Delete product ${product.id}`)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold">Add New Product</h1>
              <p className="text-muted-foreground">Create a new product listing</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sneakers">Sneakers</SelectItem>
                        <SelectItem value="crocs">Crocs</SelectItem>
                        <SelectItem value="slides">Slides</SelectItem>
                        <SelectItem value="sandals">Sandals</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input id="stock" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Product description..." rows={4} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                    <Button variant="outline" onClick={() => console.log("Choose Files button clicked")}>Choose Files</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square bg-muted rounded-md"></div>
                    <div className="aspect-square bg-muted rounded-md"></div>
                    <div className="aspect-square bg-muted rounded-md"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Available Sizes</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"].map((size) => (
                        <Button key={size} variant="outline" size="sm" onClick={() => console.log(`Selected size: ${size}`)}>
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Available Colors</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                        <Button key={color} variant="outline" size="sm" onClick={() => console.log(`Selected color: ${color}`)}>
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => console.log("Save as Draft button clicked")}>Save as Draft</Button>
              <Button onClick={() => console.log("Publish Product button clicked")}>Publish Product</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
