'use client';

import React from 'react';
import Product from '../../../(models)/Product';
import { updateProduct } from '../../../(lib)/action';
import { CldUploadWidget } from 'next-cloudinary';
interface ProductData {
    product: Product
}
export default function FormEditAProduct({ product }: ProductData) {
    let uploadWidgetRef = () => { };
    let handleUploadSuccess = () => { };
    let triggerUpload = () => { };
    let imageUrl = '';

    return (
        <>
            <form className="w-fit flex flex-col" action={updateProduct}>
                <label className="font-bold mt-2 mb-2" htmlFor="name">Nom de l'oeuvre</label>
                <input className="border-2 border-solid border-black" type="text" id="name" name="name" />
                <label className="font-bold mt-2 mb-2" htmlFor="type">Type d'oeuvre</label>
                <select className="border-solid border-black border-2 rounded-xl" name="type" id="type">
                    <option value="painting">Peinture</option>
                    <option value="drawing">Dessin</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="prix">Prix</label>
                <input className="border-2 border-solid border-black" type="number" id="prix" name="prix" />
                <label className="font-bold mt-2 mb-2" htmlFor="dimensions">Dimensions</label>
                <input className="border-2 border-solid border-black" type="text" id="dimensions" name="dimensions" />
                <label className="font-bold mt-2 mb-2" htmlFor="support">Support</label>
                <select className="border-solid border-black border-2 rounded-xl" name="support" id="support">
                    <option value="paper">Papier</option>
                    <option value="canva">Canva</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="technic">Technique</label>
                <select className="border-solid border-black border-2 rounded-xl" name="technic" id="technic">
                    <option value="pencil">Crayon</option>
                    <option value="watercolor">Aquarelle</option>
                    <option value="gouache">Gouache</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="status">Statut</label>
                <select className="border-solid border-black border-2 rounded-xl" name="status" id="status">
                    <option value="sold">Vendu</option>
                    <option value="available">Disponible</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="slug">Slug</label>
                <input className="border-2 border-solid border-black" type="text" id="slug" name="slug" />
                {imageUrl ? '' : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-2 mt-2" onClick={triggerUpload}>Uploader une image</button>}

                {imageUrl ?
                    <>
                        <label className="font-bold mt-2 mb-2" htmlFor="image_url">Url de l'image injectée en base de données</label>
                        <input className="w-0 h-0 text-white" type="text" id="image_url" name="image_url" value={imageUrl} readOnly />
                        <div>{imageUrl}</div>
                    </>
                    : null}
                <button className="w-fit bg-black text-white rounded-xl py-2 px-4 hover:bg-gray-800 mt-2" type="submit">Ajouter l'oeuvre à la base de données</button>
            </form>
            <CldUploadWidget onSuccess={handleUploadSuccess}
                uploadPreset="ml_default">
                {({ open }) => {
                    return (
                        <button ref={uploadWidgetRef}
                            className="h-0 w-0" onClick={() => open()}>
                        </button>
                    );
                }}
            </CldUploadWidget>

            <div>
                {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />}
            </div>
        </>
    )
}