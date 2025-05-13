"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TProduct } from '@/dao/products'
import { Dispatch, SetStateAction } from 'react'
import ProductsTableRow from './products-table-row'

interface AdminProductsTableProps {
  products: TProduct[]
  onEdit: (product: TProduct) => void
  onDelete: (product: TProduct) => void
  selectedProducts: string[]
  onSelectionChange: Dispatch<SetStateAction<string[]>>
}

function AdminProductsTable({ products, onEdit, onDelete, selectedProducts, onSelectionChange }: AdminProductsTableProps) {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(products.map(p => p.id))
    } else {
      onSelectionChange([])
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox
              aria-label="Select all products"
              checked={selectedProducts.length === products.length}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[80px]">Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
              No products found. Try adjusting your search or filters.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <ProductsTableRow 
              key={product.id} 
              product={product}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product)}
              isSelected={selectedProducts.includes(product.id)}
              onSelectionChange={(checked) => {
                if (checked) {
                  onSelectionChange([...selectedProducts, product.id])
                } else {
                  onSelectionChange(selectedProducts.filter(id => id !== product.id))
                }
              }}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default AdminProductsTable