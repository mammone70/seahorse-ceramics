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
  DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadFile } from "@/lib/file-storage"
import { addProductServerAction } from "@/actions/products"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import { useState } from "react"
import { MultiImageUpload } from "./multi-image-upload"

// Product categories
// const categories = ["All Categories", "Vases", "Bowls", "Mugs", "Plates", "Planters", "Sets", "Home Decor", "Bathroom"]

// interface AddProductDialogProps {
//     isOpen : boolean
//     onOpenChange : (open : boolean) => void
// }

const addProductFormSchema = z.object({
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
    images: z.array(z.instanceof(File)).min(1, "At least one image is required")
})

function AddProductDialog() {
    const { toast } = useToast()
    const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    
    const form = useForm<z.infer<typeof addProductFormSchema>>({
        resolver: zodResolver(addProductFormSchema),
        defaultValues: {
            name: "",
            price: "",
            description: "",
            stock: 0,
            images: []
        }
    })

    const onSubmit = async (values: z.infer<typeof addProductFormSchema>) => {
        try {
            // Upload all images
            const uploadPromises = values.images.map(image => uploadFile({ imageFile: image }))
            const uploadResults = await Promise.all(uploadPromises)
            
            // Check for any upload errors
            const errors = uploadResults.filter(result => result.errorMessage)
            if (errors.length > 0) {
                throw new Error("Some images failed to upload")
            }

            // Get all successful upload URLs
            const imageURLs = uploadResults.map(result => result.publicURL)

            const newProduct = {
                name: values.name,
                description: values.description,
                price: values.price,
                stock: values.stock,
                imageURL: imageURLs[0], // Set first image as main image
                images: imageURLs // Store all image URLs
            }

            await addProductServerAction(newProduct)

            form.reset()
            setSelectedImages([])
            setIsFileDialogOpen(false)

            toast({
                variant: "default",
                title: "Product Added",
                description: "Your new product has been added!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed",
                description: "Your new product was not able to be added!",
            })
        }
    }

    return (
        <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </DialogTrigger>
            
            <DialogClose onClick={() => setIsFileDialogOpen(false)}></DialogClose>
            
            <DialogContent className="max-w-2xl h-auto overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
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
                                            <FormMessage/>
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
                                            <FormMessage/>
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
                                            <FormMessage/>
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
                                                <Input placeholder="Product Description" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsFileDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                Add Product
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProductDialog