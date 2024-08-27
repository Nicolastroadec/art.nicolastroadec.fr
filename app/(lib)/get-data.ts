import { sql } from '@vercel/postgres';
import Product from '@models/Product';
export default async function getProducts(): Promise<Product[]> {
    try {
        const result = await sql`SELECT * FROM products`;
        const products = result.rows as Product[];

        const productsMapped: Product[] = products.map(product => {
            return {
                product_id: product.product_id,
                type: product.type,
                name: product.type,
                prix: product.prix,
                dimensions: product.dimensions,
                support: product.support,
                technic: product.technic,
                image_url: product.image_url,
                status: product.status,
                slug: product.slug,
            }
        })
        return productsMapped;
    } catch (err: any) {
        console.error("Error fetching products : ", err);
        return [];
    }
}

export async function getProduct(slug: string): Promise<Product> {
    try {
        const client = await sql.connect();
        const result = await client.sql`SELECT * FROM products WHERE slug = ${slug}`;
        client.release();
        const product = result.rows[0] as Product;
        const productMapped: Product = {
            product_id: product?.product_id,
            type: product?.type,
            name: product?.name,
            prix: product?.prix,
            dimensions: product?.dimensions,
            support: product?.support,
            technic: product?.technic,
            image_url: product?.image_url,
            status: product?.status,
            slug: product?.slug,
        };

        return productMapped;
    } catch (err: any) {
        console.error("Error fetching product : ", err);
        return err;
    }
}