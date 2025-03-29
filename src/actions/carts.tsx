"use server"

import { createClient } from "@/lib/supabase/server";
import * as z from "zod";

export const AddItemToCartSchema = z.object({
    productId : z.string({
        message : "Must provide Product ID"
    }),
    quantity : z.number().multipleOf(1).gt(0, {
        message : "Quantity must be a positive, whole number"
    }),
    pricePerUnit : z
        .preprocess(
            (a) => parseFloat(z.string().parse(a)),
                z.number({
                    message : "Price must be number"
                })
        ),    
})

export const AddItemToCartServerAction 
    = async (params : z.infer<typeof AddItemToCartSchema>) => {

        const validatedParams = AddItemToCartSchema.safeParse(params);

        if (!validatedParams.success){
            return { error: "Invalid params!", };
        }

        //get user
        const supabase = await createClient()

        const { data, error } = await supabase.auth.getUser()
        console.log(data);
}