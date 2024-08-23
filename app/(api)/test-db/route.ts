// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import db from '@/app/(lib)/db';

export async function GET() {
    try {
        const [rows] = await db.query('SELECT * FROM test_table');
        return NextResponse.json({ message: 'Connexion réussie', data: rows });
    } catch (error: any) {
        return NextResponse.json({ message: 'Erreur de connexion à la base de données', error: error.message }, { status: 500 });
    }
}
