"use client"

import AddProductDialog from './add-product-dialog'

function ProductsHeader() {
    // const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    
    // const handleOpenChange = (open : boolean) => {
    //     setIsAddDialogOpen(open);
    // }

    return (
        <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            {/* <AddProductDialogButton onClick={handleOpenChange}/> */}
            <div>
                <AddProductDialog 
                    // isOpen={isAddDialogOpen}
                    // onOpenChange={handleOpenChange}    
                />
            </div>
        </div>
  )
}

export default ProductsHeader
