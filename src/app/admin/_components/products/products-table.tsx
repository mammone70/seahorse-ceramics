"use client"

import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TProduct } from '@/dao/products'

import React from 'react'
import ProductsTableRow from './products-table-row'


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
                        <ProductsTableRow key={product.id} product={product}></ProductsTableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default AdminProductsTable