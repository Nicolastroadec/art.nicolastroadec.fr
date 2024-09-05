
'use client';
import { updateProduct } from '@lib/action';
import FormProduct from '@components/backoffice/FormProduct'
export default function EditAProduct() {
    return (
        <>
            <h2>Editer une oeuvre</h2>
            <FormProduct action={'updateProduct'} />w
        </>
    )
}