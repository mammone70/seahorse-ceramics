"use client"

import Logo from "@/components/logo";
import NavMenu from "@/components/nav/nav-menu";
import CartButton from "./cart/cart-button";
import MobileNavMenu from "@/components/nav/mobile-nav-menu";
import { TMenuItem } from "@/components/nav/menu-item-type";

const menuItems : TMenuItem[] = [
    {
        text: "Home",
        path: "/",
    },
    {
        text: "Collections",
        path: "/collections",
    },
    {
        text: "Products",
        path: "/products",
    },
    {
        text: "About",
        path: "/about",
    },
    {
        text: "Contact",
        path: "/contact",
    }   
]

export default function Header() {

  return (
    <header className="border-b-2 shadow-sm">
      
      {/* Large Screen */}
      <div className="hidden md:container mx-auto px-4 py-4 md:flex justify-between items-center">
        <Logo variant="horizontal" size="large"/>
        <NavMenu menuItems={menuItems}/>
        <CartButton/>
      </div>

      {/* Mobile  */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center md:hidden sm:flex">
        <Logo variant="horizontal" size="medium"/>
        <div>
          <MobileNavMenu menuItems={menuItems}/>
          <CartButton/>
        </div>
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
