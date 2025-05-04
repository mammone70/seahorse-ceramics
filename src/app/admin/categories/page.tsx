"use client"

import { CategoriesSection } from "../_components/categories/categories-section"

export default function AdminCategories() {

  return (
    // <div className="min-h-screen bg-gray-50">
    //   <main className="container mx-auto px-4 py-8">
    //     <Breadcrumb className="mb-6">
    //       <BreadcrumbList>
    //         <BreadcrumbItem>
    //           <BreadcrumbLink href="/admin/dashboard">
    //             <Home className="h-4 w-4 mr-1" />
    //             Dashboard
    //           </BreadcrumbLink>
    //         </BreadcrumbItem>
    //         <BreadcrumbSeparator />
    //         <BreadcrumbItem>
    //           <BreadcrumbLink href="/admin/categories">Categories</BreadcrumbLink>
    //         </BreadcrumbItem>
    //       </BreadcrumbList>
    //     </Breadcrumb>

    //     <h1 className="text-3xl font-bold mb-6">Category Management</h1>
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <CategoriesSection />
            </main>
        </div>
  )
}
