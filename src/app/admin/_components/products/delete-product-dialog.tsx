import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TProduct } from "@/dao/products"
import Image from "next/image"

interface DeleteProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product: TProduct | null
  onConfirm: () => void
}

export function DeleteProductDialog({ isOpen, onOpenChange, product, onConfirm }: DeleteProductDialogProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <Image
            src={product.imageURL || "/placeholder.svg"}
            alt={product.name}
            width={60}
            height={60}
            className="rounded-md object-cover border"
          />
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-muted-foreground">SKU: {product.sku || "N/A"}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 