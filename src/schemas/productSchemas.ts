import * as z from "zod";

export const GetProductByIdSchema = 
    z.object({
        id : z.string(({
            message : "Product ID is required"
        }))
    });

const MAX_FILE_SIZE = 2000000
    const ACCEPTED_IMAGE_TYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ]

export const AddProductSchema = 
    z.object({
        name : z.string(({
            message : "Product Name is required"
        })),
        description : z.string(({
            message : "Product Description is required"
        })),
        price : z
            .coerce
            .number(({
                message : "Price is required"
            }))
            .refine( n => {
                const numberParts = n.toString().split( '.' );
                return (numberParts.length > 1) 
                    ? 
                        numberParts[1].length <= 2
                    :
                        true
            }, { message: 'Max precision is 2 decimal places' } ),
            // .preprocess(
            //     (a) => parseFloat(z.string().parse(a)),
            //         z.number({
            //             message : "Price must be number"
            //         })
            // ),
        quantity : z
            .coerce
            .number(({
                message : "Quantity is required"
            }))
            .nonnegative()
            .multipleOf(1)
            .safe({
                message : "Quantity must be a positive, whole number",
            }
        ),
        // image : z.union([
        //     z.instanceof(File, {message: "Image is required"})
        //      .refine(file => !file || file.size !== 0 || file.size <= 5000000, {message:"Max size exceeded"}),
        //     z.string()// to hold default image
        //   ])
        //   .refine(value => value instanceof File || typeof value === "string", {
        //     message: "Image is required"
        //   })
        image : z.any().optional()
            .refine(file => file.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
            .refine(file => file.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 8MB.')
    });