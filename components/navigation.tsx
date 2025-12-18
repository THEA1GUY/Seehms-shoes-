"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User, Menu, Heart } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import ThemeToggle from "@/components/ThemeToggle"
import { SearchBar } from "@/components/search-bar"

const categories = [
  { name: "Slides", href: "/shop/slides" },
  { name: "Crocs", href: "/shop/crocs" },
  { name: "Sneakers", href: "/shop/sneakers" },
  { name: "Corporate", href: "/shop/corporate" },
  { name: "Sandals", href: "/shop/sandals" },
]

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-card/20 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/30 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <img src="/logo.png" alt="Seehms Shoes" className="h-full w-full object-cover" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Seehms Shoes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/shop"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Shop
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <SearchBar />
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/shop"
                      className="text-sm font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
                    >
                      Shop
                    </Link>
                  </nav>
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <Link href="/account">
                      <Button variant="ghost" className="justify-start w-full">
                        <User className="h-4 w-4 mr-2" />
                        Account
                      </Button>
                    </Link>
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
