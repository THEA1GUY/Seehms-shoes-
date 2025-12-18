"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image?: string
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string | number, color?: string, size?: string) => void
  updateQuantity: (id: string | number, color: string | undefined, size: string | undefined, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load cart from local storage on mount
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem("seehms-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart data", error)
      }
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("seehms-cart", JSON.stringify(items))
    }
  }, [items, isMounted])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...currentItems, { ...newItem, quantity: 1 }]
    })
    setIsOpen(true) // Open cart when item is added
  }

  const removeItem = (id: string | number, color?: string, size?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) =>
        !(item.id === id && item.color === color && item.size === size)
      )
    )
  }

  const updateQuantity = (id: string | number, color: string | undefined, size: string | undefined, quantity: number) => {
    if (quantity < 1) {
      removeItem(id, color, size)
      return
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        (item.id === id && item.color === color && item.size === size)
          ? { ...item, quantity }
          : item
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
