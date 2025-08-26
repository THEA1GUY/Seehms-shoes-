"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Package, DollarSign, Clock } from "lucide-react"

const mockBulkOrders = [
  {
    id: "BULK-001",
    company: "TechCorp Solutions",
    contact: "john.doe@techcorp.com",
    items: 150,
    total: 11250.0,
    status: "pending_approval",
    createdAt: "2024-01-15",
    industry: "Technology",
  },
  {
    id: "BULK-002",
    company: "Healthcare Plus",
    contact: "sarah.smith@healthplus.com",
    items: 75,
    total: 5625.0,
    status: "approved",
    createdAt: "2024-01-14",
    industry: "Healthcare",
  },
  {
    id: "BULK-003",
    company: "Restaurant Group LLC",
    contact: "mike.wilson@restgroup.com",
    items: 200,
    total: 15000.0,
    status: "in_production",
    createdAt: "2024-01-12",
    industry: "Food Service",
  },
]

const mockQuoteRequests = [
  {
    id: "QUOTE-001",
    company: "Manufacturing Inc",
    contact: "lisa.brown@mfginc.com",
    estimatedQuantity: 300,
    industry: "Manufacturing",
    status: "pending",
    createdAt: "2024-01-16",
  },
  {
    id: "QUOTE-002",
    company: "Hotel Chain",
    contact: "david.lee@hotelchain.com",
    estimatedQuantity: 120,
    industry: "Hospitality",
    status: "quoted",
    createdAt: "2024-01-15",
  },
]

export function BulkOrderManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_approval":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "in_production":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "quoted":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApproveOrder = (orderId: string) => {
    console.log(`Approving order ${orderId}`)
    // In real app, would update database and send notification
  }

  const handleRejectOrder = (orderId: string) => {
    console.log(`Rejecting order ${orderId}`)
    // In real app, would update database and send notification
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bulk Order Management</h2>
          <p className="text-muted-foreground">Manage corporate orders and quote requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">$31.9K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">18h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList>
          <TabsTrigger value="orders">Bulk Orders</TabsTrigger>
          <TabsTrigger value="quotes">Quote Requests</TabsTrigger>
          <TabsTrigger value="accounts">Corporate Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Filters */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="in_production">In Production</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {mockBulkOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.company}</p>
                      <p className="text-sm text-muted-foreground">{order.contact}</p>
                      <div className="flex space-x-4 text-sm">
                        <span>{order.items} items</span>
                        <span>${order.total.toLocaleString()}</span>
                        <span>{order.industry}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {order.status === "pending_approval" && (
                        <>
                          <Button size="sm" onClick={() => handleApproveOrder(order.id)}>
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectOrder(order.id)}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => console.log(`View details for order ${order.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <div className="space-y-4">
            {mockQuoteRequests.map((quote) => (
              <Card key={quote.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{quote.id}</h3>
                        <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{quote.company}</p>
                      <p className="text-sm text-muted-foreground">{quote.contact}</p>
                      <div className="flex space-x-4 text-sm">
                        <span>Est. {quote.estimatedQuantity} items</span>
                        <span>{quote.industry}</span>
                        <span>Requested: {quote.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => console.log(`${quote.status === "pending" ? "Create Quote" : "View Quote"} for ${quote.id}`)}>{quote.status === "pending" ? "Create Quote" : "View Quote"}</Button>
                      <Button size="sm" variant="outline" onClick={() => console.log(`Contacted ${quote.contact} for quote ${quote.id}`)}>
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Corporate Account Applications</CardTitle>
              <CardDescription>Review and approve new corporate account requests</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No pending applications</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
