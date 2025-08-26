"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Eye,
  Settings,
  Building2,
} from "lucide-react"

const mockStats = {
  totalRevenue: 45231.89,
  totalOrders: 1234,
  totalProducts: 156,
  totalUsers: 2847,
  revenueChange: 12.5,
  ordersChange: 8.2,
  productsChange: 3.1,
  usersChange: 15.3,
}

const mockRecentOrders = [
  { id: "ORD-001", customer: "John Doe", total: 89.99, status: "completed", date: "2024-01-15" },
  { id: "ORD-002", customer: "Jane Smith", total: 129.99, status: "processing", date: "2024-01-15" },
  { id: "ORD-003", customer: "Mike Johnson", total: 199.99, status: "shipped", date: "2024-01-14" },
  { id: "ORD-004", customer: "Sarah Wilson", total: 79.99, status: "pending", date: "2024-01-14" },
]

const mockLowStockProducts = [
  { id: 1, name: "Nike Air Max 270", stock: 3, category: "Sneakers" },
  { id: 2, name: "Adidas Ultraboost", stock: 1, category: "Sneakers" },
  { id: 3, name: "Classic Crocs", stock: 5, category: "Crocs" },
]

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">SH</span>
                </div>
                <span className="font-heading font-bold text-xl">Admin Panel</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Store
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => console.log("Settings button clicked")}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1 p-4">
                  <Link href="/admin">
                    <Button variant="secondary" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/admin/products">
                    <Button variant="ghost" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Products
                    </Button>
                  </Link>
                  <Link href="/admin/orders">
                    <Button variant="ghost" className="w-full justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Orders
                    </Button>
                  </Link>
                  <Link href="/admin/bulk-orders">
                    <Button variant="ghost" className="w-full justify-start">
                      <Building2 className="h-4 w-4 mr-2" />
                      Bulk Orders
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Customers button clicked")}>
                    <Users className="h-4 w-4 mr-2" />
                    Customers
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Analytics button clicked")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-heading font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your store performance and key metrics</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{mockStats.revenueChange}%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalOrders.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{mockStats.ordersChange}%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{mockStats.productsChange}%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{mockStats.usersChange}%</span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "processing"
                                    ? "secondary"
                                    : order.status === "shipped"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                      Low Stock Alert
                    </CardTitle>
                    <CardDescription>Products running low on inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLowStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="destructive">{product.stock} left</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link href="/admin/products">
                      <Button className="w-full h-20 flex flex-col space-y-2">
                        <Package className="h-6 w-6" />
                        <span>Add Product</span>
                      </Button>
                    </Link>
                    <Link href="/admin/orders">
                      <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                        <ShoppingCart className="h-6 w-6" />
                        <span>View Orders</span>
                      </Button>
                    </Link>
                    <Link href="/admin/bulk-orders">
                      <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                        <Building2 className="h-6 w-6" />
                        <span>Bulk Orders</span>
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent" onClick={() => console.log("View Analytics button clicked")}>
                      <TrendingUp className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
