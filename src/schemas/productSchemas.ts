import * as z from "zod";

export const GetProductByIdSchema = 
    z.object({
        id : z.string(({
            message : "ID is required"
        }))
    });