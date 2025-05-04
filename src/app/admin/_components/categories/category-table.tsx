"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

// Sample initial categories data
const initialCategories = [
  { id: "1", name: "Vases", slug: "vases", productCount: 8, description: "Beautiful handcrafted vases for your home" },
  { id: "2", name: "Bowls", slug: "bowls", productCount: 12, description: "Ceramic bowls for everyday use" },
  { id: "3", name: "Mugs", slug: "mugs", productCount: 15, description: "Unique mugs for your morning coffee" },
  { id: "4", name: "Plates", slug: "plates", productCount: 10, description: "Decorative and functional plates" },
  {
    id: "5",
    name: "Planters",
    slug: "planters",
    productCount: 6,
    description: "Ceramic planters for your indoor plants",
  },
]

export type Category = {
  id: string
  name: string
  slug: string
  productCount: number
  description: string
}

interface CategoryTableProps {
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
}

export function CategoryTable({ onEdit, onDelete }: CategoryTableProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories)

  // In a real app, these functions would make API calls
  const handleEdit = (category: Category) => {
    onEdit(category)
  }

  const handleDelete = (categoryId: string) => {
    // Show confirmation dialog in a real app
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== categoryId))
      onDelete(categoryId)
    }
  }

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.slug}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Badge variant="secondary">{category.productCount}</Badge>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{category.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
