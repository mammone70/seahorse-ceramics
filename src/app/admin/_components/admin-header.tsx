"use client"

import Link from "next/link"
import Image from "next/image";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, } from "lucide-react"
import { LogoutAction } from "@/actions/auth"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User as SupabaseUser } from "@supabase/supabase-js"
import AdminNavMenu from "./admin-nav-menu";

export default function AdminHeader() {
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const router = useRouter();
    
    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const {error, data} = await supabase.auth.getUser();
            
            //TODO error check

            if(!error && data)
                setUser(data?.user)
        }
        getUser()
    })

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault()
            
        try {
            await LogoutAction()
            router.push("/admin/dashboard")
        } catch (err) {
        //   setError("An error occurred during login")
          console.error(err)
        }
      }
    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900">
                    <Image 
                        src="/img/seahorse-logo.png" 
                        alt="Seahorse Ceramics"
                        width={60}
                        height={50}
                        className="rounded-full"/>
                </Link>
                
                <AdminNavMenu/>
                
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <User className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            {/* <span>{user?.name}</span> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/" className="ml-4 text-sm text-primary hover:underline">
                        View Site
                    </Link>
                </div>
            </div>
        </header>
    )
}

