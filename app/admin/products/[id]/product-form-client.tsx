'use client'

import { useState } from "react"
import { upsertProduct } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "../image-upload"
import { useRouter } from "next/navigation"

export default function ProductFormClient({ product, categories, isNew }: any) {
    const router = useRouter()
    const [images, setImages] = useState<string[]>(product?.images || [])
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        const rawData = {
            id: isNew ? undefined : product.id,
            name: formData.get('name'),
            price: parseFloat(formData.get('price') as string),
            brand: formData.get('brand'),
            category_id: parseInt(formData.get('category_id') as string),
            badge: formData.get('badge') as string || null,
            images: images,
            colors: (formData.get('colors') as string).split(',').map(s => s.trim()).filter(Boolean),
            sizes: (formData.get('sizes') as string).split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)),
        }

        await upsertProduct(rawData)
        router.push('/admin/products')
        router.refresh()
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" defaultValue={product?.name} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" name="brand" defaultValue={product?.brand} required />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category_id" defaultValue={product?.category_id?.toString() || (categories[0]?.id.toString())}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c: any) => (
                            <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label>Images</Label>
                <ImageUpload
                    value={images}
                    onChange={(urls) => setImages(urls)}
                    onRemove={(url) => setImages(urls => urls.filter(current => current !== url))}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="colors">Colors (Comma separated)</Label>
                <Input id="colors" name="colors" defaultValue={product?.colors?.join(', ')} placeholder="Red, Blue, Green" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="sizes">Sizes (Comma separated numbers)</Label>
                <Input id="sizes" name="sizes" defaultValue={product?.sizes?.join(', ')} placeholder="7, 8, 9, 10" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="badge">Badge (Optional)</Label>
                <Input id="badge" name="badge" defaultValue={product?.badge} placeholder="New, Sale, Best Seller" />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </form>
    )
}
