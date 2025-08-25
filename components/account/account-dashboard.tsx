"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Package, Heart, MapPin, Settings, LogOut } from "lucide-react"

const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 89.99,
    items: [{ name: "Nike Air Max 270", size: "US 9", color: "Black", quantity: 1, price: 89.99 }],
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "shipped",
    total: 129.99,
    items: [{ name: "Adidas Ultraboost 22", size: "US 9", color: "White", quantity: 1, price: 129.99 }],
  },
]

const mockWishlist = [
  {
    id: 1,
    name: "Jordan 1 Retro High",
    price: 170,
    image: "/jordan-1-sneakers.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Crocs Classic Clog",
    price: 49.99,
    image: "/crocs-classic-clogs.png",
    inStock: false,
  },
]

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">John Doe</CardTitle>
                    <CardDescription>john@example.com</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "overview" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "addresses" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Separator className="my-2" />
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-heading font-bold">Account Overview</h1>
                  <p className="text-muted-foreground">Manage your account and view your activity</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,249</div>
                      <p className="text-xs text-muted-foreground">+$180 from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">8</div>
                      <p className="text-xs text-muted-foreground">3 back in stock</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <p className="text-sm font-medium mt-1">${order.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-heading font-bold">Order History</h1>
                  <p className="text-muted-foreground">View and track your orders</p>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <CardDescription>Placed on {order.date}</CardDescription>
                          </div>
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-muted rounded-md"></div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">${item.price}</p>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Total: ${order.total}</p>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline" size="sm">
                                Reorder
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-heading font-bold">Wishlist</h1>
                  <p className="text-muted-foreground">Save items for later</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-md mb-4"></div>
                        <h3 className="font-medium mb-2">{item.name}</h3>
                        <p className="text-lg font-bold mb-2">${item.price}</p>
                        <div className="space-y-2">
                          <Button className="w-full" disabled={!item.inStock}>
                            {item.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-heading font-bold">Addresses</h1>
                    <p className="text-muted-foreground">Manage your shipping addresses</p>
                  </div>
                  <Button>Add New Address</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Home</CardTitle>
                        <Badge>Default</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>John Doe</p>
                        <p>123 Main Street</p>
                        <p>Apartment 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>John Doe</p>
                        <p>456 Business Ave</p>
                        <p>Suite 200</p>
                        <p>New York, NY 10002</p>
                        <p>United States</p>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-heading font-bold">Account Settings</h1>
                  <p className="text-muted-foreground">Manage your account preferences</p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="John" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="john@example.com" />
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Current Password</label>
                        <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">New Password</label>
                        <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
