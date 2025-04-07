import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddProductSchema } from "@/schemas/productSchemas"
import { ImagePlus } from "lucide-react"

import { useForm } from "react-hook-form"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

// Product categories
// const categories = ["All Categories", "Vases", "Bowls", "Mugs", "Plates", "Planters", "Sets", "Home Decor", "Bathroom"]

interface AddProductDialogProps {
    isOpen : boolean
    onOpenChange : (open : boolean) => void
}

function AddProductDialog(props : AddProductDialogProps) {
    
    const form = useForm<z.infer<typeof AddProductSchema>>({
        resolver: zodResolver(AddProductSchema),
    });

    const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
        console.log(values);
    };

    return (
        <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
            <DialogContent className="max-w-2xl h-aut overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                          onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product Name" />
                                                </FormControl>
                                                <FormDescription>
                                                    {/* This is your public display name. */}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        {...form.register("name")}
                                        id="name"
                                        // value={newProduct.name}
                                        // onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="Product Name"
                                    /> */}
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price ($)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product Price" />
                                                </FormControl>
                                                <FormDescription>
                                                    {/* Price of the Product. */}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantity</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Quantity in stock" />
                                                </FormControl>
                                                <FormDescription>
                                                    {/* Price of the Product. */}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product Price" />
                                                </FormControl>
                                                <FormDescription>
                                                    Price of the Product.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>    
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                                                <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here, or click to browse</p>
                                                <p className="text-xs text-muted-foreground">Recommended size: 800x800px. Max file size: 5MB</p>
                                                <Button variant="outline" size="sm" className="mt-4">
                                                    Upload Image
                                                </Button>
                                            </div>
                                            </FormControl>
                                            <FormDescription>
                                            
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                                {/* <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                    id="sku"
                                    // value={newProduct.sku}
                                    // onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                                    placeholder="VASE-001"
                                    />
                                </div> */}
                                {/* <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        {...form.register("price")}
                                        id="price"
                                        type="number"
                                        // value={newProduct.price}
                                        // onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                                        placeholder="39.99"
                                    />
                                </div> */}
                                {/* <div className="space-y-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        {...form.register("quantity")}
                                        id="stock"
                                        type="number"
                                        // value={newProduct.stock}
                                        // onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                                        placeholder="10"
                                    />
                                </div> */}
                                {/* <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        // value={newProduct.category}
                                        // onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                    >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories
                                        .filter((c) => c !== "All Categories")
                                        .map((category) => (
                                            <SelectItem key={category} value={category}>
                                            {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </div> */}
                                {/* <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                    // value={newProduct.status}
                                    // onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
                                    >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Archived">Archived</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div> */}
                                {/* <div className="space-y-2">
                                    <Label htmlFor="dimensions">Dimensions</Label>
                                    <Input
                                    id="dimensions"
                                    // value={newProduct.dimensions}
                                    // onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                                    placeholder="10&quot; x 5&quot; x 5&quot;"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight</Label>
                                    <Input
                                    id="weight"
                                    // value={newProduct.weight}
                                    // onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                                    placeholder="2 lbs"
                                    />
                                </div> */}
                                {/* <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        {...form.register("description")}
                                        id="description"
                                        // value={newProduct.description}
                                        // onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        placeholder="A beautiful handcrafted ceramic vase..."
                                        rows={3}
                                    />
                                </div> */}
                                {/* <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="featured"
                                        // checked={newProduct.featured}
                                        // onCheckedChange={(checked) => setNewProduct({ ...newProduct, featured: checked as boolean })}
                                    />
                                    <Label htmlFor="featured">Featured Product</Label>
                                </div> */}
                            {/* <div className="space-y-2">
                                <Label>Product Image</Label>
                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image here, or click to browse</p>
                                    <p className="text-xs text-muted-foreground">Recommended size: 800x800px. Max file size: 5MB</p>
                                    <Button variant="outline" size="sm" className="mt-4">
                                        Upload Image
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => props.onOpenChange(false)}>
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