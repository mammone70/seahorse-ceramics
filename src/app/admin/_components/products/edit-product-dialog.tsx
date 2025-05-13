"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TProduct } from "@/dao/products"
import { useToast } from "@/hooks/use-toast"
import { uploadFile } from "@/lib/file-storage"
import { X } from "lucide-react"
import { useState } from "react"
import { MultiImageUpload } from "./multi-image-upload"

interface EditProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product: TProduct | null
  onSave: (product: TProduct) => void
}

// Extended product type to include images array
interface ExtendedProduct extends TProduct {
  images?: string[]
}

export function EditProductDialog({ isOpen, onOpenChange, product, onSave }: EditProductDialogProps) {
  const { toast } = useToast()
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [editedProduct, setEditedProduct] = useState<ExtendedProduct | null>(null)

  if (!product) return null

  // Initialize editedProduct when product changes
  if (!editedProduct) {
    setEditedProduct({
      ...product,
      images: product.imageURL ? [product.imageURL] : []
    })
  }

  const handleSave = async () => {
    if (!editedProduct) return

    try {
      let imageURLs: string[] = []
      
      // Upload new images if any
      if (selectedImages.length > 0) {
        const uploadPromises = selectedImages.map(image => uploadFile({ imageFile: image }))
        const uploadResults = await Promise.all(uploadPromises)
        
        // Check for any upload errors
        const errors = uploadResults.filter(result => result.errorMessage)
        if (errors.length > 0) {
          throw new Error("Some images failed to upload")
        }

        // Get all successful upload URLs
        imageURLs = uploadResults.map(result => result.publicURL || "")
      }

      // Combine existing and new image URLs
      const allImageURLs = [
        ...(editedProduct.images || []),
        ...imageURLs
      ]

      const updatedProduct: TProduct = {
        ...editedProduct,
        imageURL: allImageURLs[0] || editedProduct.imageURL
      }

      onSave(updatedProduct)
      setSelectedImages([])
      setEditedProduct(null)
      onOpenChange(false)

      toast({
        variant: "default",
        title: "Product Updated",
        description: "Your product has been updated successfully!",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update the product. Please try again.",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the details of your product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Product Name</Label>
              <Input
                id="edit-name"
                value={editedProduct?.name}
                onChange={(e) => setEditedProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                type="number"
                value={editedProduct?.price}
                onChange={(e) => setEditedProduct(prev => prev ? { ...prev, price: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                type="number"
                value={editedProduct?.stock}
                onChange={(e) => setEditedProduct(prev => prev ? { ...prev, stock: Number(e.target.value) } : null)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editedProduct?.description}
                onChange={(e) => setEditedProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Product Images</Label>
            <MultiImageUpload
              onImagesChange={setSelectedImages}
              maxFiles={5}
            />
            {editedProduct?.images && editedProduct.images.length > 0 && (
              <div className="mt-4">
                <Label>Current Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {editedProduct.images.map((imageURL, index) => (
                    <div key={imageURL} className="relative group">
                      <img
                        src={imageURL}
                        alt={`Product image ${index + 1}`}
                        className="rounded-md object-cover w-full aspect-square"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setEditedProduct(prev => {
                            if (!prev) return null
                            const newImages = [...(prev.images || [])]
                            newImages.splice(index, 1)
                            return {
                              ...prev,
                              images: newImages,
                              imageURL: newImages[0] || prev.imageURL
                            }
                          })
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 