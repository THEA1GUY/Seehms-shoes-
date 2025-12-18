import { getProduct, getCategories } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductFormClient from "./product-form-client"

export const dynamic = 'force-dynamic';

export default async function ProductFormPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const isNew = id === 'new'
    const product = !isNew ? await getProduct(parseInt(id)) : null
    const categories = await getCategories()

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>{isNew ? "Add New Product" : "Edit Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductFormClient product={product} categories={categories} isNew={isNew} />
                </CardContent>
            </Card>
        </div>
    )
}
