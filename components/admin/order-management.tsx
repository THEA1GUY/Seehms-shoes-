"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getOrders, updateOrderStatus, deleteOrder } from "@/app/newsletter-actions"
import { verifyPayment } from "@/app/payment-actions"
import { Package, Loader2, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react"
import { ShoeLoader } from "@/components/shoe-loader"

// Extended type to include payment fields
interface Order {
  id: number
  orderNumber: string
  status: string
  totalAmount: number
  paymentStatus: string
  paymentProof?: string | null
  transactionId?: string | null
  createdAt: string
  customerEmail?: string
  customerName?: string
  customerPhone?: string
  shippingAddress?: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode?: string
  }
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [verifyingId, setVerifyingId] = useState<number | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const data = await getOrders()
    setOrders(data)
    setIsLoading(false)
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus)
    loadOrders()
  }

  const handleVerifyPayment = async (orderId: number, approved: boolean) => {
    setVerifyingId(orderId)
    await verifyPayment(orderId, approved)
    setVerifyingId(null)
    loadOrders()
  }

  const confirmDelete = async (orderId: number) => {
    // Optimistic Update: Immediately remove from UI
    const originalOrders = [...orders]
    setOrders(prev => prev.filter(o => o.id !== orderId))

    // Perform actual delete
    const result = await deleteOrder(orderId)

    if (!result.success) {
      // Revert on failure
      alert("Failed to delete order")
      setOrders(originalOrders)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500"
      case "processing": return "bg-blue-500"
      case "shipped": return "bg-purple-500"
      case "delivered": return "bg-green-500"
      case "cancelled": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ShoeLoader text="Loading Orders..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold">Orders</h2>
        <Badge variant="outline">{orders.length} total orders</Badge>
      </div>

      {orders.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No orders yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mr-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        Order #{order.orderNumber}
                        {((order.paymentProof || order.transactionId) && order.paymentStatus !== 'paid') && (
                          <Badge variant="secondary" className="text-xs">
                            Verification Needed
                          </Badge>
                        )}
                      </CardTitle>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Order?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete Order #{order.orderNumber} and all its data.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => confirmDelete(order.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <p>{order.customerName} • {order.customerEmail}</p>
                      {order.customerPhone && <p className="flex items-center gap-1">📞 {order.customerPhone}</p>}
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Shipping Details</p>
                    {order.shippingAddress ? (
                      <div className="text-sm">
                        <p>{order.shippingAddress.addressLine1}</p>
                        {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No address</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Financials</p>
                    <p className="font-semibold">₦{order.totalAmount.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">{order.paymentStatus}</Badge>
                      </div>

                      {(order.paymentProof || order.transactionId) && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="w-full">
                              <Eye className="h-3 w-3 mr-2" />
                              Verify Payment
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-xl">
                            <DialogHeader>
                              <DialogTitle>Verify Payment for #{order.orderNumber}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm bg-muted p-4 rounded-lg">
                                <div>
                                  <p className="text-muted-foreground">Amount Due</p>
                                  <p className="font-bold text-lg">₦{order.totalAmount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Transaction ID</p>
                                  <p className="font-mono">{order.transactionId || 'N/A'}</p>
                                </div>
                              </div>

                              {order.paymentProof ? (
                                <div className="space-y-2">
                                  <p className="font-medium">Proof of Payment</p>
                                  <div className="aspect-video w-full rounded-lg overflow-hidden border bg-muted relative group">
                                    <img
                                      src={order.paymentProof}
                                      alt="Payment Proof"
                                      className="w-full h-full object-contain"
                                    />
                                    <a
                                      href={order.paymentProof}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium"
                                    >
                                      Click to Open Full Image
                                    </a>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-8 text-center border-2 border-dashed rounded-lg text-muted-foreground">
                                  No image proof uploaded (Transaction ID only)
                                </div>
                              )}

                              <div className="pt-4 border-t flex gap-2 justify-end">
                                <Button
                                  variant="destructive"
                                  onClick={() => handleVerifyPayment(order.id, false)}
                                  disabled={verifyingId === order.id}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleVerifyPayment(order.id, true)}
                                  disabled={verifyingId === order.id}
                                >
                                  {verifyingId === order.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve Payment
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Update Status
                    </p>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
