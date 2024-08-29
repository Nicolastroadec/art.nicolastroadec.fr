import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnBackoffice = nextUrl.pathname.startsWith('/backoffice');
            if (isOnBackoffice) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                console.log('LOGGED IN');
                return Response.redirect(new URL('/backoffice', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;