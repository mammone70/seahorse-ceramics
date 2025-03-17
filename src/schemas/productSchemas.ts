import * as z from "zod";

export const GetProductByIdSchema = 
    z.object({
        id : z.string(({
            message : "Product ID is required"
        }))
    });

// export const AddToCartSchema = 
//     z.object({
//         id : z.string(({
//             message : "ID is required"
//         })),
//         name : z.string(({
//             message : "Product Name is required"
//         })),
//         price : z
//             .preprocess(
//                 (a) => parseFloat(z.string().parse(a)),
//                     z.number({
//                         message : "Price must be number"
//                     })
//             ),
//         imageUrl : z.string().url({
//             message : "Must provide a valid Image URL"
//         }),
//         quantity : z
//             .number()
//             .nonnegative()
//             .multipleOf(1)
//             .safe({
//                 message : "Quantity must be a positive, whole number",
//             })
//     });