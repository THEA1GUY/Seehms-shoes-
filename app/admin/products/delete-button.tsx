'use client'

import { removeProduct } from "@/app/actions" // We need to create this
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

export function DeleteProductButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
            disabled={isPending}
            onClick={() => {
                if (confirm('Are you sure you want to delete this product?')) {
                    startTransition(async () => {
                        try {
                            await removeProduct(id)
                            toast.success("Product deleted")
                        } catch (e) {
                            toast.error("Failed to delete product")
                        }
                    })
                }
            }}
        >
            <Trash className="h-4 w-4" />
        </Button>
    )
}
