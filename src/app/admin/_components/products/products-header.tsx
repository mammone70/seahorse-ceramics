"use client"

import { Button } from "@/components/ui/button"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2 } from "lucide-react"
import AddProductDialog from "./add-product-dialog"

interface ProductsHeaderProps {
  totalProducts: number
  onDeleteSelected?: () => void
  hasSelectedProducts?: boolean
}

export function ProductsHeader({ totalProducts, onDeleteSelected, hasSelectedProducts }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <TabsList>
        <TabsTrigger value="all">All Products ({totalProducts})</TabsTrigger>
      </TabsList>
      <div className="flex items-center gap-2">
        <AddProductDialog />
        {hasSelectedProducts && (
          <Button variant="outline" size="sm" className="text-destructive" onClick={onDeleteSelected}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
        )}
      </div>
    </div>
  )
}
