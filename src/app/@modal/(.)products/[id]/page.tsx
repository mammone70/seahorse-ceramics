import { Modal } from "@/components/modal";

export default async function ProductModal({ 
    params, 
} : {
    params : Promise<{id : string}>
}) 
{
    const id = (await params).id; 

    return (
        <Modal>
            {id}
        </Modal> 
     )
}
