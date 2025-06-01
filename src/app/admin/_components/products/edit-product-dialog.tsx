"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { TProduct } from "@/dao/products"
import { useToast } from "@/hooks/use-toast"
import { uploadFile } from "@/lib/file-storage"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { MultiImageUpload } from "./multi-image-upload"
import Image from "next/image"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface EditProductDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product: TProduct | null
  onSave: (product: TProduct) => void
}

// Extended product type to include images array
// interface ExtendedProduct extends TProduct {
//   images?: string[]
// }

const editProductFormSchema = z.object({
  name: z.string({
    message: "Product Name is required"
  }),
  description: z.string({
    message: "Product Description is required"
  }),
  price: z.string({
    message: "Price is required"
  }).refine(n => {
    const numberParts = n.toString().split('.')
    return (numberParts.length > 1)
      ? numberParts[1].length <= 2
      : true
  }, { message: 'Max precision is 2 decimal places' }),
  stock: z.coerce.number({
    message: "Quantity is required"
  }).nonnegative().multipleOf(1).safe({
    message: "Quantity must be a positive, whole number",
  }),
  images: z.array(z.instanceof(File)).optional()
})

export function EditProductDialog({ isOpen, onOpenChange, product, onSave }: EditProductDialogProps) {
  const { toast } = useToast()
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      stock: 0,
      images: []
    }
  })

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (isOpen && product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: []
      })
    } else {
      form.reset({
        name: "",
        price: "",
        description: "",
        stock: 0,
        images: []
      })
      setSelectedImages([])
    }
  }, [isOpen, product, form])

  const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
    try {
      let imageURLs: {imageURL: string}[] = []
      
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
        imageURLs = uploadResults
          .map(result => ({imageURL: result.publicURL}))
          .filter((url): url is {imageURL: string} => url.imageURL !== null)
      }

      // Get the current images that haven't been removed
      const currentImages = product?.images || []
      
      // Combine current and new images
      const updatedImages = [...currentImages, ...imageURLs] as {id: string, imageURL: string, productId: string, createdAt: Date, updatedAt: Date}[]

      const updatedProduct: TProduct = {
        ...product!,
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        images: updatedImages,
        imageURL: updatedImages[0]?.imageURL || ""
      }
console.log("updatedProduct", updatedProduct)
      onSave(updatedProduct)
      setSelectedImages([])
      onOpenChange(false)

      toast({
        variant: "default",
        title: "Product Updated",
        description: "Your product has been updated successfully!",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to update the product. Please try again.",
      })
    }
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogClose onClick={() => onOpenChange(false)}></DialogClose>
      <DialogContent className="max-w-2xl h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update the details of your product.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Quantity in stock" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                      <MultiImageUpload
                        onImagesChange={(files) => {
                          field.onChange(files)
                          setSelectedImages(files)
                        }}
                        maxFiles={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {product.images && product.images.length > 0 && (
                <div className="mt-4">
                  <FormLabel>Current Images</FormLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                    {product.images.map((image, index) => (
                      <div key={image.imageURL} className="relative group">
                        <Image
                          src={image.imageURL || ""}
                          alt={`Product image ${index + 1}`}
                          className="rounded-md object-cover w-full aspect-square"
                          width={100}
                          height={100}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newImages = [...product.images!]
                            newImages.splice(index, 1)
                            onSave({
                              ...product,
                              images: newImages as {id: string, imageURL: string, productId: string, createdAt: Date, updatedAt: Date}[],
                              imageURL: newImages[0].imageURL || product.imageURL
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 