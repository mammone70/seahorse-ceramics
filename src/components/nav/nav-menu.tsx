"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"

import { usePathname } from "next/navigation";
import { TMenuItem } from "@/components/nav/menu-item-type";

type NavMenuProps = {
  menuItems : TMenuItem[]
}

export default function NavMenu(props : NavMenuProps) {
    const pathName = usePathname();
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {props.menuItems.map((menuItem, index) => (
                    <NavigationMenuItem key={index}>
                        <Link href={menuItem.path} legacyBehavior passHref>
                            <NavigationMenuLink 
                                className={`font-bold text-xl px-2 py-1 ${pathName == menuItem.path ? "border rounded-lg border-primary bg-white pointer-events-none" : ""}`}>
                                {menuItem.text}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
