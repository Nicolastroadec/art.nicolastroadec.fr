'use client';
import Product from '@models/Product';
import Cookies from 'js-cookie';
import { checkProductAvailability } from '@lib/get-data';
import { useState, useEffect, useContext } from 'react';

import { CartContext } from '@context/context';
interface ProductProps {
    productData: Product
}

export default function ProductUI({ productData }: ProductProps) {
    const { name, prix, dimensions, support, technic, product_id } = productData;
    const [productInCart, setProductInCart] = useState(false);

    const { addToCart, checkIfInCart } = useContext(CartContext);

    useEffect(() => {
        setProductInCart(checkIfInCart(product_id))
    }, [product_id, checkIfInCart])

    async function handleAddProduct(product_id: string | number) {
        addToCart(product_id).then(() => setProductInCart(true));
    }


    return (
        <div className="p-10 w-1/3 flex flex-col justify-between">
            <div>
                <h1 className="text-black">{name}</h1>
                <p className="text-black"><strong>Prix :</strong> {prix} €</p>
                <p className="text-black"><strong>Dimensions :</strong> {dimensions} cm</p>
                <p className="text-black"><strong>Support :</strong> {support}</p>
                <p className="text-black"><strong>Technique utilisée :</strong> {technic}</p>
            </div>
            <button className={`text-white  rounded p-4 flex justify-center align-center text-center ${productInCart ? "bg-black hover:bg-black opacity-50 cursor-default" : "bg-black hover:bg-gray-700"}`} onClick={() => { handleAddProduct(product_id) }}>{productInCart ? "Ce produit est dans votre panier" : "Ajouter au panier"}</button>
        </div>
    )
}