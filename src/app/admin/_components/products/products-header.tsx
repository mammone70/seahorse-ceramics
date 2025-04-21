"use client"

import React, { useState } from 'react'
import AddProductDialogButton from './add-product-dialog-button'
import AddProductDialog from './add-product-dialog'

function ProductsHeader() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    
    const handleAddProductClick = () => {
        setIsAddDialogOpen(true);
    }
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <AddProductDialogButton onClick={handleAddProductClick}/>
            <AddProductDialog 
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}    
            />
        </div>
  )
}

export default ProductsHeader
