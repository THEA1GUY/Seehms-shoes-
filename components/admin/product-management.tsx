
"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox" // <--- Add this line
import { Plus, Search, Edit, Trash2, Eye, ArrowLeft, Upload, X } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const predefinedColors = [
  "Black", "White", "Gray", "Brown", "Navy", "Blue", "Red", "Green", "Yellow", "Pink", "Olive"
];

export function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // New state // New state

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `);
    if (error) {
      console.error('Error fetching products:', error);
    } else if (data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) {
        console.error('Error fetching categories:', error);
      } else if (data) {
        setCategories(data);
      }
    }
    fetchCategories();
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (product.categories && product.categories.name.toLowerCase() === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  function resetForm() {
    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setSelectedFiles([]);
    setImageUrl(""); // New reset
    setEditingProduct(null);
    setSelectedSizes([]);
    setSelectedColors([]); // New reset // New reset
  }

  async function handleSaveProduct() {
    let imageUrls = [];
    if (imageUrl) { // Use the new imageUrl state
        imageUrls = [imageUrl];
    } else if (editingProduct && editingProduct.images) {
        imageUrls = editingProduct.images; // Keep existing images if no new URL is provided
    }

    const productData = {
        name: productName,
        category_id: parseInt(category),
        price: parseFloat(price),
        description: description,
        images: imageUrls,
        stock: parseInt(stock),
        sizes: selectedSizes, // Include selectedSizes
        colors: selectedColors, // Include selectedColors
    };

    let error;
    if (editingProduct) {
        const { error: updateError } = await supabase.from("products").update(productData).match({ id: editingProduct.id });
        error = updateError;
    } else {
        const { error: insertError } = await supabase.from("products").insert([productData]);
        error = insertError;
    }

    if (error) {
        console.error("Error saving product:", error);
        alert("Error saving product.");
    } else {
        alert(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
        fetchProducts();
        resetForm();
        setActiveTab("list");
    }
  }

  async function handleDeleteProduct(productId: number) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().match({ id: productId });
      if (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product.');
      } else {
        alert('Product deleted successfully!');
        fetchProducts();
      }
    }
  }

  function handleSizeToggle(size: number) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function handleColorToggle(color: string) {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }

  function handleEditClick(product: any) {
    setEditingProduct(product);
    setProductName(product.name);
    setCategory(String(product.category_id));
    setPrice(String(product.price));
    setStock(String(product.stock));
    setDescription(product.description);
    setImageUrl(product.images?.[0] || ""); // Assuming product.images is an array of URLs, take the first one
    setSelectedFiles([]);
    setSelectedSizes(product.sizes || []); // Populate selectedSizes
    setSelectedColors(product.colors || []); // Populate selectedColors
    setActiveTab('add');
  }

  function handleCancelEdit() {
    resetForm();
    setActiveTab('list');
  }

  

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
              <Button onClick={() => { resetForm(); setActiveTab("add"); }}>
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
            <TabsTrigger value="add">{editingProduct ? 'Edit Product' : 'Add Product'}</TabsTrigger>
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
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                          {cat.name}
                        </SelectItem>
                      ))}
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
                        <img src={product.images[0]} alt={product.name} className="h-16 w-16 bg-muted rounded-md object-cover"/>
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.categories ? product.categories.name : 'Uncategorized'}</p>
                          <p className="text-sm font-medium">${product.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">Stock: {product.stock}</p>
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock > 0 ? "Active" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => console.log(`View product ${product.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEditClick(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDeleteProduct(product.id)}>
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
              <h1 className="text-3xl font-heading font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h1>
              <p className="text-muted-foreground">{editingProduct ? 'Update the product details.' : 'Create a new product listing.'}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Total Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Product description..."
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      placeholder="Enter image URL (e.g., https://example.com/shoe.jpg)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  {imageUrl && (
                    <div className="aspect-square bg-muted rounded-md overflow-hidden">
                      <img
                        src={imageUrl}
                        alt="Image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Sizes Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Sizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 26 }, (_, i) => 25 + i).map((size) => ( // Sizes from 25 to 50
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => handleSizeToggle(size)}
                        />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Colors Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {predefinedColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => handleColorToggle(color)}
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Colors Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {predefinedColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => handleColorToggle(color)}
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveProduct}>{editingProduct ? 'Update Product' : 'Publish Product'}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
