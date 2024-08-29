import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { z } from 'zod';
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};


async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users where email = ${email}`;
        return user.rows[0];
    } catch (err: any) {
        console.error('Failed to fetch user : ', err);
        throw new err;
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;

                }
                console.log('Invalid credentials');
                return null;
            }
        })],
});