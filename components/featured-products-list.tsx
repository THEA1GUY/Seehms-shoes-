"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingBag, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { Product } from "@/app/actions"

interface FeaturedProductsListProps {
    products: Product[]
}

export function FeaturedProductsList({ products }: FeaturedProductsListProps) {
    const { addItem } = useCart()

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            image: product.images?.[0] || "/placeholder.svg",
            color: product.colors?.[0], // Default first color
            size: product.sizes?.[0], // Default first size
        })
        toast.success("Added to cart!")
    }

    return (
        <>
            <div className="text-center space-y-4 mb-12 md:mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl"
                >
                    Featured Products
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
                >
                    Discover our most popular and highly-rated footwear, loved by thousands of customers.
                </motion.p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/product/${product.id}`} className="block h-full">
                            <Card className="glass-card h-full overflow-hidden group border-0 ring-1 ring-black/5 dark:ring-white/10">
                                <div className="relative overflow-hidden aspect-[4/5] bg-secondary/5">
                                    <img
                                        src={product.images?.[0] || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                            onClick={(e) => handleAddToCart(e, product)}
                                        >
                                            <ShoppingBag className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                                        //  onClick={(e) => e.preventDefault()} // Would go to quick view
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    {product.badge && (
                                        <Badge
                                            className={`absolute top-4 left-4 font-semibold shadow-lg ${product.badge === "Sale"
                                                ? "bg-destructive text-destructive-foreground hover:bg-destructive"
                                                : product.badge === "New"
                                                    ? "bg-primary text-primary-foreground hover:bg-primary"
                                                    : "bg-accent text-accent-foreground hover:bg-accent"
                                                }`}
                                        >
                                            {product.badge}
                                        </Badge>
                                    )}
                                </div>

                                <CardContent className="p-1.5 sm:p-5 space-y-1.5 sm:space-y-3">
                                    <div className="space-y-0.5 sm:space-y-1">
                                        <div className="flex justify-between items-center sm:items-start flex-col sm:flex-row">
                                            <p className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider line-clamp-1">{product.categories?.name || 'Shoes'}</p>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <Star className="h-2.5 w-2.5 sm:h-3 w-3 fill-accent text-accent" />
                                                <span className="text-[10px] sm:text-xs font-medium">{product.rating || 0}</span>
                                            </div>
                                        </div>
                                        <h3 className="font-heading font-bold text-xs sm:text-lg group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                                        <div className="flex flex-col">
                                            {product.originalPrice && (
                                                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">₦{product.originalPrice}</span>
                                            )}
                                            <span className="font-bold text-sm sm:text-xl">₦{product.price}</span>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="hidden sm:flex text-primary hover:text-primary/80 px-0 hover:bg-transparent group/btn h-auto py-0"
                                        >
                                            Add to Cart <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <Link href="/shop">
                    <Button
                        size="lg"
                        variant="outline"
                        className="px-10 h-12 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                        View All Products
                    </Button>
                </Link>
            </div>
        </>
    )
}
