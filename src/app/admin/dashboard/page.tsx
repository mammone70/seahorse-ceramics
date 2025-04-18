"use client"

// import { useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Package, ShoppingBag, Users } from "lucide-react"
// import { Toaster } from "@/components/ui/toaster"

export default function AdminDashboard() {
  // const searchParams = useSearchParams()
  // const tab = searchParams.get("tab") || "orders"

  return (
    <>Dash</>
    // <div className="min-h-screen bg-gray-50">
    //   <main className="container mx-auto px-4 py-8">
    //     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    //     <div className="grid gap-4 md:grid-cols-3 mb-8">
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    //           <ShoppingBag className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">$12,345</div>
    //           <p className="text-xs text-muted-foreground">+18% from last month</p>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Products</CardTitle>
    //           <Package className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">24</div>
    //           <p className="text-xs text-muted-foreground">6 added this month</p>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Customers</CardTitle>
    //           <Users className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">573</div>
    //           <p className="text-xs text-muted-foreground">+32 this week</p>
    //         </CardContent>
    //       </Card>
    //     </div>

    //     <Tabs defaultValue={tab}>
    //       <TabsList>
    //         <TabsTrigger value="orders">Recent Orders</TabsTrigger>
    //         <TabsTrigger value="products">Products</TabsTrigger>
    //         <TabsTrigger value="customers">Customers</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="orders" className="mt-4">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Recent Orders</CardTitle>
    //             <CardDescription>Manage your recent customer orders</CardDescription>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="rounded-md border">
    //               <table className="min-w-full divide-y divide-gray-200">
    //                 <thead className="bg-gray-50">
    //                   <tr>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Order ID
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Customer
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Date
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Status
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Total
    //                     </th>
    //                   </tr>
    //                 </thead>
    //                 <tbody className="bg-white divide-y divide-gray-200">
    //                   {[
    //                     {
    //                       id: "ORD-001",
    //                       customer: "John Doe",
    //                       date: "2023-06-12",
    //                       status: "Completed",
    //                       total: "$129.99",
    //                     },
    //                     {
    //                       id: "ORD-002",
    //                       customer: "Jane Smith",
    //                       date: "2023-06-11",
    //                       status: "Processing",
    //                       total: "$79.99",
    //                     },
    //                     {
    //                       id: "ORD-003",
    //                       customer: "Robert Johnson",
    //                       date: "2023-06-10",
    //                       status: "Shipped",
    //                       total: "$249.99",
    //                     },
    //                     {
    //                       id: "ORD-004",
    //                       customer: "Emily Davis",
    //                       date: "2023-06-09",
    //                       status: "Completed",
    //                       total: "$59.99",
    //                     },
    //                     {
    //                       id: "ORD-005",
    //                       customer: "Michael Brown",
    //                       date: "2023-06-08",
    //                       status: "Processing",
    //                       total: "$149.99",
    //                     },
    //                   ].map((order) => (
    //                     <tr key={order.id}>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
    //                     </tr>
    //                   ))}
    //                 </tbody>
    //               </table>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
    //       <TabsContent value="products" className="mt-4">
    //         <ProductsSection />
    //       </TabsContent>
    //       <TabsContent value="customers" className="mt-4">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Customers</CardTitle>
    //             <CardDescription>View and manage your customer base</CardDescription>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="rounded-md border">
    //               <table className="min-w-full divide-y divide-gray-200">
    //                 <thead className="bg-gray-50">
    //                   <tr>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Name
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Email
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Orders
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Spent
    //                     </th>
    //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                       Actions
    //                     </th>
    //                   </tr>
    //                 </thead>
    //                 <tbody className="bg-white divide-y divide-gray-200">
    //                   {[
    //                     { id: 1, name: "John Doe", email: "john@example.com", orders: 3, spent: "$249.97" },
    //                     { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 2, spent: "$89.98" },
    //                     { id: 3, name: "Robert Johnson", email: "robert@example.com", orders: 5, spent: "$374.95" },
    //                     { id: 4, name: "Emily Davis", email: "emily@example.com", orders: 1, spent: "$39.99" },
    //                     { id: 5, name: "Michael Brown", email: "michael@example.com", orders: 4, spent: "$199.96" },
    //                   ].map((customer) => (
    //                     <tr key={customer.id}>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //                         {customer.name}
    //                       </td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.spent}</td>
    //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                         <Button variant="outline" size="sm" className="mr-2">
    //                           View
    //                         </Button>
    //                         <Button variant="outline" size="sm">
    //                           Email
    //                         </Button>
    //                       </td>
    //                     </tr>
    //                   ))}
    //                 </tbody>
    //               </table>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
    //     </Tabs>
    //   </main>
    //   <Toaster />
    // </div>
  )
}

