export type Product = {
    id: number
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    images: string[]
    badge?: string
    colors?: string[]
    sizes?: number[]
    brand: string
    categories: { name: string }
}

export const products: Product[] = [
    {
        id: 1,
        name: "CloudWalk Pro Sneakers",
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviews: 124,
        images: ["/premium-white-sneakers-athletic-shoes.png"],
        badge: "Best Seller",
        colors: ["White", "Black", "Gray"],
        sizes: [7, 8, 9, 10, 11],
        brand: "Nike",
        categories: { name: "Sneakers" }
    },
    {
        id: 2,
        name: "Executive Leather Oxfords",
        price: 199.99,
        rating: 4.9,
        reviews: 89,
        images: ["/black-leather-oxford-dress-shoes-professional.png"],
        badge: "Premium",
        colors: ["Black", "Brown"],
        sizes: [8, 9, 10, 11, 12],
        brand: "Clarks",
        categories: { name: "Corporate" }
    },
    {
        id: 3,
        name: "Comfort Plus Slides",
        price: 49.99,
        rating: 4.7,
        reviews: 203,
        images: ["/comfortable-slides-sandals-casual-footwear.png"],
        badge: "New",
        colors: ["Black", "White", "Navy"],
        sizes: [6, 7, 8, 9, 10],
        brand: "Adidas",
        categories: { name: "Slides" }
    },
    {
        id: 4,
        name: "Adventure Sandals",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.6,
        reviews: 156,
        images: ["/outdoor-adventure-sandals-hiking-footwear.png"],
        badge: "Sale",
        colors: ["Brown", "Black", "Olive"],
        sizes: [7, 8, 9, 10, 11],
        brand: "Teva",
        categories: { name: "Sandals" }
    },
    {
        id: 5,
        name: "Urban Runner Elite",
        price: 145.00,
        rating: 4.5,
        reviews: 78,
        images: ["/placeholder.svg"],
        colors: ["Red", "Black"],
        sizes: [8, 9, 10],
        brand: "Puma",
        categories: { name: "Sneakers" }
    },
    {
        id: 6,
        name: "Classic Loafers",
        price: 110.00,
        rating: 4.3,
        reviews: 45,
        images: ["/placeholder.svg"],
        colors: ["Brown", "Tan"],
        sizes: [9, 10, 11],
        brand: "Gucci",
        categories: { name: "Corporate" }
    }
]

export const categories = [
    { id: 1, name: "Sneakers" },
    { id: 2, name: "Corporate" },
    { id: 3, name: "Slides" },
    { id: 4, name: "Sandals" }
]
