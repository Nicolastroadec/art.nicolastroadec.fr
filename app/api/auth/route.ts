// app/api/auth/signout/route.ts
import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await signOut({ redirect: false, callbackUrl: "/" });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}