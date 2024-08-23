import { db } from '@vercel/postgres';
export default async function getProducts() {
    try {
        const client = await db.connect();

        const result = await client.sql`SELECT * FROM products`;
        const products = result.rows;
        return products;
    } catch (err: any) {
        return err;
    }
}