
'use client';
import { getProduct, updateProduct } from '@lib/action';
import { CldUploadWidget } from 'next-cloudinary';
import { useParams } from 'next/navigation';
import Product from '@models/Product'
import { useEffect, useState, useRef } from 'react';
export default function page() {
    const params = useParams();
    const id: string = String(params.id);
    const [imageUrl, setImageUrl] = useState(undefined);
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProduct(id);
                setProduct(productData);
                console.log(productData);
                setImageUrl(productData.image_url);
            } catch (err: any) {
                console.error('Error fetching product: ', err);
            }
        };

        fetchProduct();
    }, [id]);
    const uploadWidgetRef = useRef<HTMLButtonElement>(null);

    const handleUploadSuccess = (result: any) => {
        console.log('upload success');
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

    return (
        <>
            <h2>Editer une oeuvre</h2>
            <form className="w-fit flex flex-col" action={updateProduct}>
                <label className="font-bold mt-2 mb-2" htmlFor="name">Nom de l'oeuvre</label>
                <input onChange={handleChange} className="border-2 border-solid border-black" type="text" id="name" name="name" value={product?.name ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="type">Type d'oeuvre</label>
                <select onChange={handleChange} className="border-solid border-black border-2 rounded-xl" name="type" id="type" value={product?.type ?? ''}>
                    <option value="painting">Peinture</option>
                    <option value="drawing">Dessin</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="prix">Prix</label>
                <input onChange={handleChange} className="border-2 border-solid border-black" type="number" id="prix" name="prix" value={product?.prix ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="dimensions">Dimensions</label>
                <input onChange={handleChange} className="border-2 border-solid border-black" type="text" id="dimensions" name="dimensions" value={product?.dimensions ?? ''} />
                <label className="font-bold mt-2 mb-2" htmlFor="support">Support</label>
                <select onChange={handleChange} className="border-solid border-black border-2 rounded-xl" name="support" id="support" value={product?.support ?? ''}>
                    <option value="paper">Papier</option>
                    <option value="canva">Canva</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="technic">Technique</label>
                <select onChange={handleChange} className="border-solid border-black border-2 rounded-xl" name="technic" id="technic" value={product?.technic ?? ''}>
                    <option value="pencil">Crayon</option>
                    <option value="watercolor">Aquarelle</option>
                    <option value="gouache">Gouache</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="status">Statut</label>
                <select onChange={handleChange} className="border-solid border-black border-2 rounded-xl" name="status" id="status" value={product?.status ?? ''}>
                    <option value="sold">Vendu</option>
                    <option value="available">Disponible</option>
                </select>
                <label className="font-bold mt-2 mb-2" htmlFor="slug">Slug</label>
                <input onChange={handleChange} className="border-2 border-solid border-black" type="text" id="slug" name="slug" value={product?.slug ?? ''} />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit mb-2 mt-2" onClick={triggerUpload}>Modifier l'image</button>

                {imageUrl ?
                    <>
                        <label className="font-bold mt-2 mb-2" htmlFor="image_url">Url de l'image injectée en base de données</label>
                        <input className="w-0 h-0 text-white" type="text" id="image_url" name="image_url" value={imageUrl} readOnly />
                        <div>{imageUrl}</div>
                    </>
                    : null}
                <button className="w-fit bg-black text-white rounded-xl py-2 px-4 hover:bg-gray-800 mt-2" type="submit">Modifier l'oeuvre</button>
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

        </>
    )
}