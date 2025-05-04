"use client"

// import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryTable, } from "./category-table"
import { toast } from "@/hooks/use-toast"
import { AddCategoryDialog } from "./add-category-dialog"

export function CategoriesSection() {
//   const [currentCategory, setCurrentCategory] = useState<Category | null>(null)


    const handleEditCategory = () => {
        // In a real app, this would make an API call to delete the category
        toast({
            title: "Category Edit",
            description: `Category Edited.`,
            variant: "default",
            })
    }
  
    const handleDeleteCategory = (categoryId: string) => {
        // In a real app, this would make an API call to delete the category
        toast({
        title: "Category deleted",
        description: `Category ID: ${categoryId} has been removed.`,
        variant: "default",
        })
  }

//   const handleSaveCategory = (category: Partial<Category>) => {
//     // In a real app, this would make an API call to save the category
//     if (currentCategory) {
//       toast({
//         title: "Category updated",
//         description: `${category.name} has been updated successfully.`,
//         variant: "default",
//       })
//     } else {
//       toast({
//         title: "Category added",
//         description: `${category.name} has been added successfully.`,
//         variant: "default",
//         action: <ToastAction altText="View">View</ToastAction>,
//       })
//     }
//   }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-end justify-between">
            <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage your product categories</CardDescription>
            </div>
            <div>
                <AddCategoryDialog/>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <CategoryTable onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
      </CardContent>
    </Card>
  )
}
