
export default async function ProductPage({ 
    params, 
} : {
    params : Promise<{id : string}>
}) 
{
    const id = (await params).id; 

    return (
        <div>{id}</div>
     )
}
