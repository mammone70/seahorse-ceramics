import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { TMenuItem } from './menu-item-type'

type MobileNavMenuProps = {
  menuItems : TMenuItem[]
}

export default function MobileNavMenu(props : MobileNavMenuProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <SheetTitle></SheetTitle>
              <div className="grid gap-4 p-4">
                {props.menuItems.map(
                    (menuItem, index) => (
                      <Link
                        href="{menuItem.path}"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        prefetch={false}
                        key={index}
                      >
                      {menuItem.text}
                    </Link>
                  ))
                }

              </div>
            </SheetContent>
          </Sheet>
    )
}
