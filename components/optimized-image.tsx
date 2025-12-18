"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    fill?: boolean
    sizes?: string
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    fill = false,
    sizes,
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    if (error) {
        return (
            <div className={`bg-muted flex items-center justify-center ${className}`}>
                <span className="text-muted-foreground text-sm">Image unavailable</span>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <Skeleton className="absolute inset-0 z-10" />
            )}
            <Image
                src={src}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                sizes={sizes}
                priority={priority}
                className={className}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false)
                    setError(true)
                }}
            />
        </div>
    )
}
