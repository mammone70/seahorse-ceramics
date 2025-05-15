import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { TProduct } from "@/dao/products"
import { Checkbox } from '@/components/ui/checkbox'
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProductsTableRowProps {
  product: TProduct
  onEdit: () => void
  onDelete: () => void
  isSelected: boolean
  onSelectionChange: (checked: boolean) => void
}

export default function ProductsTableRow({ product, onEdit, onDelete, isSelected, onSelectionChange }: ProductsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="w-[50px]">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelectionChange}
          aria-label={`Select ${product.name}`}
        />
      </TableCell>
      <TableCell>
        <Image
          src={product.imageURL || "/placeholder.svg"}
          alt={product.name}
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      </TableCell>
      <TableCell className="font-medium">
        {product.name}
        <div className="text-xs text-muted-foreground">SKU: {product.id}</div>
      </TableCell>
      <TableCell>N/A</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        <Badge>Active</Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
