"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getRecommendedProducts } from "@/app/recommendation-actions"

interface RecommendedProductsProps {
    productId: number
    limit?: number
}

export function RecommendedProducts({ productId, limit = 4 }: RecommendedProductsProps) {
    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadRecommendations() {
            setIsLoading(true)
            const recommendations = await getRecommendedProducts(productId, limit)
            setProducts(recommendations)
            setIsLoading(false)
        }

        loadRecommendations()
    }, [productId, limit])

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-heading font-bold">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: limit }).map((_, i) => (
                        <div key={i} className="glass-card h-64 animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                        <Card className="glass-card overflow-hidden hover:shadow-xl transition-all group">
                            <div className="relative aspect-square overflow-hidden">
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                )}
                                {product.badge && (
                                    <Badge className="absolute top-2 right-2">
                                        {product.badge}
                                    </Badge>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-1 mb-2">
                                    {product.rating && (
                                        <>
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs text-muted-foreground">
                                                {product.rating}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-primary">
                                        ₦{product.price.toLocaleString()}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-xs text-muted-foreground line-through">
                                            ₦{product.originalPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
