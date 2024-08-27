import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import Product from '@models/Product';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    try {

        const client = await db.connect();
        const result = await client.sql`SELECT status FROM products WHERE product_id = ${id}`;
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const productMapped: Product | undefined = result.rows[0] ? result.rows[0] = {
            product_id: result.rows[0].product_id,
            type: result.rows[0].type,
            name: result.rows[0].type,
            prix: result.rows[0].prix,
            dimensions: result.rows[0].dimensions,
            support: result.rows[0].support,
            technic: result.rows[0].technic,
            image_url: result.rows[0].image_url,
            status: result.rows[0].status,
            slug: result.rows[0].slug,
        } : undefined;

        return NextResponse.json({ status: result.rows[0].status });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
