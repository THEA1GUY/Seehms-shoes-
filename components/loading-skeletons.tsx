import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
    return (
        <Card className="glass-card overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </CardContent>
        </Card>
    )
}

export function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-2xl" />
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="w-20 h-20 rounded-md" />
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-20 w-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}
