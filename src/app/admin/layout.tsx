import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Added import for React
import AdminHeader from "./components/admin-header"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en">
        <body className={`${inter.className} bg-gradient-to-r from-sky-300 to-cyan-100 text-gray-900`}>
            <AdminHeader/>
            {children}
        </body>
    </html>
  )
}

