import * as z from "zod";

export const GetProductByIdSchema = 
    z.object({
        id : z.string(({
            message : "Product ID is required"
        }))
    });

export const AddProductSchema = 
    z.object({
        name : z.string(({
            message : "Product Name is required"
        })),
        description : z.string(({
            message : "Product Description is required"
        })),
        price : z
            .number()
            .refine( n => {
                return n.toString().split( '.' )[ 1 ].length <= 2
            }, { message: 'Max precision is 2 decimal places' } ),
            // .preprocess(
            //     (a) => parseFloat(z.string().parse(a)),
            //         z.number({
            //             message : "Price must be number"
            //         })
            // ),
        imageUrl : z.string().optional(),
        quantity : z
            .number()
            .nonnegative()
            .multipleOf(1)
            .safe({
                message : "Quantity must be a positive, whole number",
            }),
    });