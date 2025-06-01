import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as products from './schemas/products';
import * as images from './schemas/images';
import * as cartItems from './schemas/cartItems';
import * as categories from './schemas/categories';


const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({
    client,
    schema: {
        ...products,
        ...images,
        ...cartItems,
        ...categories
    }
});