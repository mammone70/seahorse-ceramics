import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

interface AddProductDialogButtonProps {
    onClick : () => void
}

function AddProductDialogButton(props : AddProductDialogButtonProps) {
    return (
        <Button onClick={props.onClick}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
    )
}

export default AddProductDialogButton