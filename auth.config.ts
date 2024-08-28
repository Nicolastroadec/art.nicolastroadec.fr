import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: { nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnBackoffice = nextUrl.pathname.startsWith('/backoffice');
            if (isOnBackoffice) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;