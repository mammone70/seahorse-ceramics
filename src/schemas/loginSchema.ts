import * as z from "zod";

export const LoginSchema = z.object({
    email : z.string({
        message : "Must provide Email address"
    })
            .email(),
    password : z.string({
        message : "Must provide Password"
    }),    
})
