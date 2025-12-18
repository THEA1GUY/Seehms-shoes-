"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { searchProducts } from "@/app/search-actions"
import { useDebounce } from "@/hooks/use-debounce"

export function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const debouncedQuery = useDebounce(query, 300)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function performSearch() {
            if (debouncedQuery.length < 2) {
                setResults([])
                return
            }

            setIsLoading(true)
            const searchResults = await searchProducts(debouncedQuery)
            setResults(searchResults)
            setIsLoading(false)
            setShowResults(true)
        }

        performSearch()
    }, [debouncedQuery])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleResultClick = (productId: number) => {
        setShowResults(false)
        setQuery("")
        router.push(`/product/${productId}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query) {
            setShowResults(false)
            router.push(`/shop?search=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div ref={wrapperRef} className="relative flex-1">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search shoes..."
                    className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full glass-card rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {results.map((result) => (
                        <button
                            key={result.id}
                            onClick={() => handleResultClick(result.id)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                        >
                            {result.image && (
                                <img
                                    src={result.image}
                                    alt={result.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{result.name}</p>
                                <p className="text-sm text-muted-foreground">{result.brand}</p>
                            </div>
                            <p className="font-semibold text-primary">
                                ₦{result.price.toLocaleString()}
                            </p>
                        </button>
                    ))}
                </div>
            )}

            {showResults && query.length >= 2 && results.length === 0 && !isLoading && (
                <div className="absolute top-full mt-2 w-full glass-card rounded-lg shadow-xl z-50 p-4 text-center text-muted-foreground">
                    No products found for "{query}"
                </div>
            )}
        </div>
    )
}
