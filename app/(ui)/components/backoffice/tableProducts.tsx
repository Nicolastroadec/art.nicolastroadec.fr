'use client';

import Product from '@models/Product';
import { deleteProduct } from '@lib/action';

import { useState, useRef, useEffect } from 'react';

interface ArtItemsCopy {
    artItemsCopy: Product[]
}
export default function TableProducts({ artItemsCopy }: ArtItemsCopy) {
    const formComp = useRef<HTMLFormElement>(null);
    const [productIdToDelete, setProductIdToDelete] = useState('');

    function handleClickOnDelete(product_id: string) {
        setProductIdToDelete(product_id);
    }

    useEffect(() => {
        if (productIdToDelete) {
            formComp.current?.requestSubmit();
        }
    }, [productIdToDelete]);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">ID du produit</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Type</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Nom de l'oeuvre</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Prix</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Dimensions</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Support</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Technique</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">URL de l'image</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Statut</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Slug</th>
                    </tr>
                </thead>
                <tbody>
                    {artItemsCopy.map(art => (
                        <tr key={art.product_id}>
                            <th className="border-solid border-black border-2 font-light">{art.product_id}</th>
                            <th className="border-solid border-black border-2 font-light">{art.type}</th>
                            <th className="border-solid border-black border-2 font-light">{art.name}</th>
                            <th className="border-solid border-black border-2 font-light">{art.prix}</th>
                            <th className="border-solid border-black border-2 font-light">{art.dimensions}</th>
                            <th className="border-solid border-black border-2 font-light">{art.support}</th>
                            <th className="border-solid border-black border-2 font-light">{art.technic}</th>
                            <th className="border-solid border-black border-2 font-light">{art.image_url}</th>
                            <th className="border-solid border-black border-2 font-light">{art.status}</th>
                            <th className="border-solid border-black border-2 font-light">{art.slug}</th>
                            <th onClick={() => { handleClickOnDelete(String(art.product_id)) }} className="border-solid border-black border-2 font-light text-red text-bold hover:cursor-pointer">Delete product</th>
                        </tr>

                    ))}
                </tbody>
            </table>
            <form ref={formComp} action={deleteProduct}>
                <input readOnly value={productIdToDelete} name="product_id" id="product_id" />
            </form>
        </>
    )
}