"use client"
import Link from "next/link"
import Image from "next/image";

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider";

export default function Header() {
  const { setIsOpen, totalItems } = useCart()

  return (
    <header className="border-b-2 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
            <Image 
                src="/img/seahorse-logo.png" 
                alt="Seahorse Ceramics"
                width={60}
                height={50}
                className="rounded-full"/>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)} className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </div>
    </header>
  )
}


// import Link from "next/link";
// import NavMenu from "./nav-menu";
// import Image from "next/image";
// // import { MenuIcon } from "lucide-react";

// export default async function Header() {
//     return (
//         <header className="border-b border-muted-foreground/15 bg-white">
//             <div className="container px-4">
//                 <div className="flex justify-between items-center align-bottom">
//                     <div className="inline-flex items-center justify-between align-bottom">
//                         <div>
//                             <Link href="/" className="font-bold text-xl">
//                                 <Image 
//                                     src="/img/seahorse-logo.png" 
//                                     alt="Seahorse Ceramics"
//                                     width={75}
//                                     height={75}/>
//                             </Link>
//                         </div>
//                     </div>
//                     <div>
//                         Seahorse Ceramics
//                     </div>
//                     <div>
//                         <NavMenu/>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }
