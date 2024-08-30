'use server';

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';



const FormSchema = z.object({
    id: z.string() || z.number(),
    name: z.string(),
    type: z.enum(['painting', 'drawing']),
    prix: z.coerce.number(),
    dimensions: z.string(),
    support: z.enum(['paper', 'canva']),
    technic: z.enum(['pencil', 'watercolor', 'gouache']),
    status: z.enum(['sold', 'available']),
    imageUrl: z.string(),
    slug: z.string()
})

export async function addProduct(formData: FormData) {
    try {
        const { id, name, type, prix, dimensions, support, technic, imageUrl, status, slug } = FormSchema.parse({
            id: uuidv4(),
            name: formData.get('name'),
            type: formData.get('type'),
            prix: Number(formData.get('prix')),
            dimensions: formData.get('dimensions'),
            support: formData.get('support'),
            technic: formData.get('technic'),
            status: formData.get('status'),
            imageUrl: formData.get('image_url'),
            slug: formData.get('slug')
        })

        await sql`INSERT INTO products (product_id, type, name, prix, dimensions, support, technic, image_url, status, slug) 
        VALUES (${id}, ${type}, ${name}, ${prix}, ${dimensions}, ${support}, ${technic}, ${imageUrl}, ${status}, ${slug})`;

        revalidatePath('/backoffice');
    } catch (error) {
        console.error('Error in function add product : ', error);
        return error;
    }
}

export async function deleteProduct(formData: FormData) {
    const formSchema = z.object({
        product_id: z.string().uuid()
    })

    const { product_id } = formSchema.parse({
        product_id: formData.get('product_id') as string,
    });


    try {
        sql`DELETE FROM products WHERE product_id=${product_id}`;
        revalidatePath('/backoffice');
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', { formData });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    console.log(error);
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
