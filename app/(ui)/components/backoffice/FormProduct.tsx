'use client';

import React from 'react';
import Product from '../../../(models)/Product';
import { getProduct, updateProduct, addProduct } from '../../../(lib)/action';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

/* type ProductAction = (formData: FormData) => Promise<any>;
 */
interface FormEditProps {
    action: 'addProduct' | 'updateProduct',
}
export default function FormProduct({ action }: FormEditProps) {
    const params = useParams();

    const id = params?.id ? String(params?.id) : '';

    const [imageUrl, setImageUrl] = useState<string>('');

    const [submitText, setSubmitText] = useState('Envoyer');

    const [product, setProduct] = useState<Product>({
        product_id: '',
        name: '',
        type: '',
        prix: 0,
        dimensions: '',
        support: '',
        technic: '',
        image_url: '',
        status: '',
        slug: '',
    })

    let actionForm;

    useEffect(() => {
        if (action === 'updateProduct') {

            const fetchProduct = async () => {
                try {
                    const productData = await getProduct(id);
                    setProduct(productData);
                    setImageUrl(productData.image_url);
                } catch (err: any) {
                    console.error('Error fetching product: ', err);
                }
            };

            fetchProduct();
            setSubmitText('Mettre à jour le produit');
        }

        if (action === 'addProduct') {
            setSubmitText('Ajouter le produit');
        }
    }, [id, submitText, actionForm]);

    if (action === 'updateProduct') {
        actionForm = updateProduct;
    }
    if (action === 'addProduct') {
        actionForm = addProduct;
    }

    const uploadWidgetRef = useRef<HTMLButtonElement>(null);

    const handleUploadSuccess = (result: any) => {
        if (result.info && result.info.secure_url) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                image_url: result.info.secure_url
            }))
            setImageUrl(result.info.secure_url);
        }
    }

    const triggerUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        if (uploadWidgetRef.current) {
            uploadWidgetRef.current.click();
        }
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        event.preventDefault();
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    }

    const classNameInput = "border-2 border-solid border-black w-full";
    const classNameSelect = "border-2 border-solid border-black rounded-xl w-full";

    return (
        <>
            <form className="w-1/2 flex flex-col items-center justify-center m-auto" action={actionForm}>
                <label className="font-bold mt-2 mb-2" htmlFor="name">Nom de l'oeuvre</label>
                <input onChange={handleChange} className={classNameInput} type="text" id="name" name="name" value={product?.name ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="type">Type d'oeuvre</label>
                <select onChange={handleChange} className={classNameSelect} name="type" id="type" value={product?.type ?? ''}>
                    <option value="painting">Peinture</option>
                    <option value="drawing">Dessin</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="prix">Prix</label>
                <input onChange={handleChange} className={classNameInput} type="number" id="prix" name="prix" value={product?.prix ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="dimensions">Dimensions</label>
                <input onChange={handleChange} className={classNameInput} type="text" id="dimensions" name="dimensions" value={product?.dimensions ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="support">Support</label>
                <select onChange={handleChange} className={classNameSelect} name="support" id="support" value={product?.support ?? ''}>
                    <option value="paper">Papier</option>
                    <option value="canva">Canva</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="technic">Technique</label>
                <select onChange={handleChange} className={classNameSelect} name="technic" id="technic" value={product?.technic ?? ''}>
                    <option value="pencil">Crayon</option>
                    <option value="watercolor">Aquarelle</option>
                    <option value="gouache">Gouache</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="status">Statut</label>
                <select onChange={handleChange} className={classNameSelect} name="status" id="status" value={product?.status ?? ''}>
                    <option value="sold">Vendu</option>
                    <option value="available">Disponible</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="slug">Slug</label>
                <input onChange={handleChange} className={classNameInput} type="text" id="slug" name="slug" value={product?.slug ?? ''} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-2 mt-2" onClick={triggerUpload}>Modifier l'image</button>

                {imageUrl ?
                    <>
                        <label className="font-bold mt-2 mb-2" htmlFor="image_url">Url de l'image injectée en base de données</label>
                        <input className="w-0 h-0 text-white" type="text" id="image_url" name="image_url" value={imageUrl} readOnly />
                        <div>{imageUrl}</div>
                    </>
                    : null}
                <button className="w-fit bg-black text-white rounded-xl py-2 px-4 hover:bg-gray-800 mt-2" type="submit">{submitText}</button>
                <input type="text" hidden readOnly id="id" name="id" value={product?.product_id ?? ''} />
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