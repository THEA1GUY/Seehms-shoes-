"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Loader2 } from "lucide-react"
import { getProductReviews, submitReview, type Review } from "@/app/review-actions"

interface ProductReviewsProps {
    productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [formData, setFormData] = useState({
        rating: 5,
        title: "",
        comment: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
        loadReviews()

        // Check if user is logged in
        const userData = localStorage.getItem("user")
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [productId])

    const loadReviews = async () => {
        setIsLoading(true)
        const data = await getProductReviews(productId)
        setReviews(data)
        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            setError("Please login to submit a review")
            return
        }

        setIsSubmitting(true)
        setError("")

        const result = await submitReview({
            userId: user.id,
            productId,
            rating: formData.rating,
            title: formData.title,
            comment: formData.comment
        })

        if (result.success) {
            setFormData({ rating: 5, title: "", comment: "" })
            setShowForm(false)
            loadReviews()
        } else {
            setError(result.error || "Failed to submit review")
        }

        setIsSubmitting(false)
    }

    const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                        onClick={() => interactive && onRate && onRate(star)}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold">Customer Reviews</h2>
                {user && !showForm && (
                    <Button onClick={() => setShowForm(true)}>Write a Review</Button>
                )}
                {!user && (
                    <p className="text-sm text-muted-foreground">Login to write a review</p>
                )}
            </div>

            {/* Review Form */}
            {showForm && (
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Write Your Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Rating</Label>
                                {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Title (Optional)</Label>
                                <Input
                                    id="title"
                                    placeholder="Sum up your experience"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comment">Your Review (Optional)</Label>
                                <Textarea
                                    id="comment"
                                    placeholder="Tell us what you think..."
                                    rows={4}
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                />
                            </div>

                            {error && (
                                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Submit Review
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : reviews.length === 0 ? (
                <Card className="glass-card">
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No reviews yet. Be the first to review this product!
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id} className="glass-card">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-semibold">{review.user_name || "Anonymous"}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {renderStars(review.rating)}
                                </div>
                                {review.title && (
                                    <h3 className="font-semibold mb-2">{review.title}</h3>
                                )}
                                {review.comment && (
                                    <p className="text-muted-foreground">{review.comment}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
