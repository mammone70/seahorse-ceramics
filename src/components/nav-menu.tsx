"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from "next/link"

import { usePathname } from "next/navigation";

const menuItems : {text: string, path: string}[] = [
    {
        text: "About",
        path: "/about",
    },
    {
        text: "Collections",
        path: "/collections",
    },
]

export default function NavMenu() {
    const pathName = usePathname();
    return (
        <NavigationMenu >
            <NavigationMenuList>
                {menuItems.map((menuItem, index) => (
                    <NavigationMenuItem key={index}>
                        <Link href={menuItem.path} legacyBehavior passHref>
                            <NavigationMenuLink 
                                className={`font-bold text-xl p-1 ${pathName == menuItem.path ? "border rounded-md border-primary bg-muted/80 pointer-events-none" : ""}`}>
                                {menuItem.text}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
