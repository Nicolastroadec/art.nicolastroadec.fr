import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    try {

        const client = await db.connect();
        const result = await client.sql`SELECT status FROM products WHERE product_id = ${id}`;
        console.log(result);
        client.release();

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ status: result.rows[0].status });
    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
