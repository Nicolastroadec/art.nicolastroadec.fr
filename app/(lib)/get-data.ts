import { db } from '@vercel/postgres';
export default async function getProducts() {
    try {
        const client = await db.connect();
        const result = await client.sql`SELECT * FROM products`;
        client.release();
        const products = result.rows;
        return products;
    } catch (err: any) {
        return err;
    }
}

export async function getProduct(slug: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`SELECT * FROM products WHERE slug = ${slug}`;
        client.release();
        const product = result.rows.length > 0 ? result.rows[0] : null;
        return product;
    } catch (err: any) {
        return err;
    }
}