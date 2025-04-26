import "../globals.css"
import type { Metadata } from "next"
import type React from "react" // Added import for React
import AdminHeader from "./_components/admin-header"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Handcrafted Ceramics",
  icons : "/img/seahorse-logo.png",
  description: "Beautiful homemade ceramics from Coastal California",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {

  return (
    <>
      <AdminHeader/>
      {children}
      <Toaster />
    </>
  )
}

