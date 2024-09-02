'use client';

import Product from '@models/Product';
import { deleteProduct } from '@lib/action';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'
import Link from 'next/link';


interface ArtItemsCopy {
    artItemsCopy: Product[]
}
export default function TableProducts({ artItemsCopy }: ArtItemsCopy) {
    async function handleClickOnDelete(product_id: string) {
        try {
            await deleteProduct(product_id);
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
        }
    }

    const classCellsThead = "border-solid border-2 border-black bg-black text-white px-4 py-4";
    const classCellsTbody = "border-solid border-black border-2 font-light";
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th className={classCellsThead}>ID du produit</th>
                        <th className={classCellsThead}>Type</th>
                        <th className={classCellsThead}>Nom de l'oeuvre</th>
                        <th className={classCellsThead}>Prix</th>
                        <th className={classCellsThead}>Dimensions</th>
                        <th className={classCellsThead}>Support</th>
                        <th className={classCellsThead}>Technique</th>
                        <th className={classCellsThead}>URL de l'image</th>
                        <th className={classCellsThead}>Statut</th>
                        <th className={classCellsThead}>Slug</th>
                    </tr>
                </thead>
                <tbody>
                    {artItemsCopy.map(art => (
                        <tr key={art.product_id}>
                            <th className={classCellsTbody}>{art.product_id}</th>
                            <th className={classCellsTbody}>{art.type}</th>
                            <th className={classCellsTbody}>{art.name}</th>
                            <th className={classCellsTbody}>{art.prix}</th>
                            <th className={classCellsTbody}>{art.dimensions}</th>
                            <th className={classCellsTbody}>{art.support}</th>
                            <th className={classCellsTbody}>{art.technic}</th>
                            <th className={classCellsTbody}>{art.image_url}</th>
                            <th className={classCellsTbody}>{art.status}</th>
                            <th className={classCellsTbody}>{art.slug}</th>
                            <th className={classCellsTbody}>
                                <Link href={`/backoffice/${art.product_id}/edit`}>
                                    <PencilIcon className="size-6 text-blue-300 hover:cursor-pointer hover:text-blue-600" />
                                </Link>
                            </th>
                            <th onClick={() => { handleClickOnDelete(String(art.product_id)) }}
                                className={classCellsTbody}>
                                <TrashIcon className="size-6 text-red-300 hover:cursor-pointer hover:text-red-600" />
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}