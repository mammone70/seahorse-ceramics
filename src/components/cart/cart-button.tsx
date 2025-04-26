import React from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'

export default function CartButton() {
    const { setIsOpen, totalItems } = useCart()
    
    return (
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
    )
}
