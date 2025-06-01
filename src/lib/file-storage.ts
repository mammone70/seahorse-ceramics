/*
    Utility classes to manage bucket file storage.

    Supabase implementation
*/

import { createClient } from "./supabase/client"

const PRODUCT_IMAGE_BUCKET_NAME = "product-images";

export type TUploadFileReturn = {
    publicURL : string
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
                upsert: true  //is this what we want?
            }
        )
    
    if (error) {
        console.log(error)
        return {
            publicURL : "",
            errorMessage : error.message
        }
    }
    
    const { data } = supabase  
        .storage  
        .from(PRODUCT_IMAGE_BUCKET_NAME)  
        .getPublicUrl(`${imageFile.name}`)

    return {
        publicURL : data.publicUrl,
        errorMessage : null
    }

}

export async function uploadMultipleFiles(
    {imageFiles} : {imageFiles : File[]}
) : Promise<TUploadFileReturn[]> {
    // return Promise.all(imageFiles.map(uploadFile))
    const uploadPromises = imageFiles.map(image => uploadFile({ imageFile: image }))
    const uploadResults = await Promise.all(uploadPromises)
            
    // Check for any upload errors
    const errors = uploadResults.filter(result => result.errorMessage)
    if (errors.length > 0) {
        throw new Error("Some images failed to upload")
    }

    // Get all successful upload URLs
    const imageURLs = uploadResults
        .map(
            (result) => 
                ({
                    publicURL : result.publicURL,
                })
            )
        .filter((url): url is TUploadFileReturn => url.publicURL !== null)
    
    return imageURLs;
}

export async function deleteFile(publicURL : string) : Promise<void> {
    const supabase = await createClient();
    const {error} = await supabase.storage.from(PRODUCT_IMAGE_BUCKET_NAME).remove([publicURL]);
    if (error) {
        console.log(error)
    }
}