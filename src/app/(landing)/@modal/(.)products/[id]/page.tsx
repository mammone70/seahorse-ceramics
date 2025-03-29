import { Modal } from "@/components/modal";
import ProductDetail from "@/components/products/product-detail";

export default async function ProductModal({ 
    params, 
} : {
    params : Promise<{id : string}>
}) 
{
    const id = (await params).id; 

    return (
        <div>
            <Modal>
                <ProductDetail id={id}/>
            </Modal> 
        </div>
     )
}
