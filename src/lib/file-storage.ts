/*
    Utility classes to manage bucket file storage.

    Supabase implementation
*/

import { createClient } from "./supabase/client"

const PRODUCT_IMAGE_BUCKET_NAME = "product-images";

export type TUploadFileReturn = {
    publicURL : string | null
    errorMessage : string | null | undefined
}

export async function uploadFile(
        {imageFile} : {imageFile : File}
    ) : Promise<TUploadFileReturn> {
    
    
    const supabase = await createClient();

    // const {data, error} = await supabase
    const {error} = await supabase
        .storage
        .from(PRODUCT_IMAGE_BUCKET_NAME)
        .upload(
            `${imageFile.name}`, 
            imageFile, 
            {    
                cacheControl: '3600',    
                upsert: false  
            }
        )
    
    const { data } = supabase  
        .storage  
        .from(PRODUCT_IMAGE_BUCKET_NAME)  
        .getPublicUrl(`${imageFile.name}`)

    return {
        publicURL : data.publicUrl,
        errorMessage : error?.message
    }

}