import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import { TProduct } from "@/dao/products"
import { Checkbox } from '@/components/ui/checkbox'
import { MoreHorizontal } from "lucide-react"

import Image from "next/image"

export type TProductsTableRowProps = {
    product : TProduct
}

export default function ProductsTableRow(props : TProductsTableRowProps) {
    return (
        <TableRow key={props.product.id}>
            <TableCell className="w-[50px]">
                <Checkbox
                // checked={selectedProducts.includes(product.id)}
                // onCheckedChange={() => toggleSelectProduct(product.id)}
                aria-label={`Select ${props.product.name}`}
                />
            </TableCell>
            <TableCell>
                <Image
                src={props.product.imageURL || "/placeholder.svg"}
                alt={props.product.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
                />
            </TableCell>
            <TableCell className="font-medium">
                {props.product.name}
                {/* {product.featured && (
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                    Featured
                </Badge>
                )} */}
                <div className="text-xs text-muted-foreground">SKU: 12345</div>
            </TableCell>
            <TableCell>Category</TableCell>
            <TableCell>${props.product.price}</TableCell>
            <TableCell>{props.product.stock}</TableCell>
            <TableCell>
                {/* <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                {product.status}
                </Badge> */}
                <Badge>
                    Active
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem
                        onClick={() => {
                            setCurrentProduct(product)
                            setIsEditDialogOpen(true)
                        }}
                        >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem> */}
                        {/* <DropdownMenuItem
                        onClick={() => {
                            setCurrentProduct(product)
                            setIsDeleteDialogOpen(true)
                        }}
                        className="text-destructive"
                        >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
