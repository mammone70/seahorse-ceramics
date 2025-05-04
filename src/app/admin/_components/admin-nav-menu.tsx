"use client"

import { TMenuItem } from '@/components/nav/menu-item-type'
import { cn } from '@/lib/utils'
import { Grid, Package, ShoppingBag, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AdminNavMenu() {
    const menuItems : TMenuItem[] = [
        { 
            path: "/admin/dashboard", 
            text: "Dashboard", 
            icon: <Grid className="h-4 w-4 mr-2" /> 
        },
        { 
            path: "/admin/products", 
            text: "Products", 
            icon: <Package className="h-4 w-4 mr-2" /> 
        },
        { 
            path: "/admin/categories",
            text: "Categories", 
            icon: <Grid className="h-4 w-4 mr-2" /> 
        },
        { 
            path: "/admin/orders", 
            text: "Orders", 
            icon: <ShoppingBag className="h-4 w-4 mr-2" /> 
        },
        {  
            path: "/admin/customers", 
            text: "Customers", 
            icon: <Users className="h-4 w-4 mr-2" /> 
        },
    ]

    const pathname = usePathname()

    return (
        <nav>
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center text-gray-600 hover:text-gray-900",
                    (pathname === item.path) &&
                      "text-primary font-bold",
                  )}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
    )
}
