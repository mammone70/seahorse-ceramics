import ProductDetail from "@/components/products/product-detail";

export default async function ProductPage({ 
    params, 
} : {
    params : Promise<{id : string}>
}) 
{
    const id = (await params).id; 

    return (
        <ProductDetail id={id}/>
     )
}
