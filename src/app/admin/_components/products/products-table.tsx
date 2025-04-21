"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TProduct } from '@/dao/products'

import React from 'react'
import Image from "next/image"
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'


function AdminProductsTable({products} : {products : TProduct[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <Checkbox
                            aria-label="Select all products"
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
                    <TableRow key={product.id}>
                        <TableCell>
                            <Checkbox
                            // checked={selectedProducts.includes(product.id)}
                            // onCheckedChange={() => toggleSelectProduct(product.id)}
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
                            {/* {product.featured && (
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                Featured
                            </Badge>
                            )} */}
                            <div className="text-xs text-muted-foreground">SKU: 12345</div>
                        </TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
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
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default AdminProductsTable