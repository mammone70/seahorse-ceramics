"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Define the form schema with Zod
const addCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
  description: z.string().optional(),
})

export function AddCategoryDialog() {
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  
  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
      resolver: zodResolver(addCategoryFormSchema),
      defaultValues : {
          name : "",
          description : "",
          slug : ""
      }
  });

  // Reset form when category changes
  // useEffect(() => {
  //   if (category) {
  //     form.reset({
  //       name: category.name,
  //       slug: category.slug,
  //       description: category.description,
  //     })
  //   } else {
  //     form.reset({
  //       name: "",
  //       slug: "",
  //       description: "",
  //     })
  //   }
  // }, [category, isOpen, form])

  // Create slug from name
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
  }

  // Watch the name field to auto-generate slug
    // const watchedName = form.watch("name")
    // const watchedSlug = form.watch("slug")

  // Auto-generate slug when name changes and slug hasn't been manually edited
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        const currentSlug = form.getValues("slug")
        // Only update slug if it's empty or matches the previous auto-generated slug
        if (!currentSlug || currentSlug === createSlug(value.name as string)) {
          form.setValue("slug", createSlug(value.name as string), { shouldValidate: true })
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = 
    async (values: z.infer<typeof addCategoryFormSchema>) => {
        try {
            
            const newCategory = {
                name : values.name,
                description : values.description,
                slug : values.slug
            }

            //TODO server action
            
            form.reset();

            setIsAddDialogOpen(false);

            toast({
                variant: "default",
                title: "Category Added",
                description: "Your new Category has been added! " + newCategory.name,
            });
        }
        catch {
            toast({
                variant: "destructive",
                title: "Failed",
                description: "Your new Product was not able to be added!",
            });

        }
      };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
          <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
      </DialogTrigger>
      
      <DialogClose onClick={() => setIsAddDialogOpen(false)}></DialogClose>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {/* <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle> */}
          <DialogTitle>Add New Category</DialogTitle>
  
          <DialogDescription>
            {/* {category ? "Update the category details below." : "Fill in the details to add a new category."} */}
            Fill in the details to add a new category.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slug <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The slug is used in URLs and should contain only lowercase letters, numbers, and hyphens.
                  </FormDescription>
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
                    <Textarea {...field} rows={4} placeholder="Enter a description for this category (optional)" />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {/* {category ? "Update Category" : "Add Category"} */}
                Add Category
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
