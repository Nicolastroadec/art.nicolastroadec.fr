'use client';
import { addProduct } from '@lib/action';
import FormProduct from '@components/backoffice/FormProduct';

export default function AddAProduct() {
    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold">Ajouter une oeuvre</h2>
            <FormProduct action={'addProduct'} />
        </>
    )
}