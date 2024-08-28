'use client';
import Product from '@models/Product';
import Cookies from 'js-cookie';
import { checkProductAvailability } from '@lib/get-data';
import { useState, useEffect } from 'react';
import useCart from "@context/CartContext";
import { CartProvider } from '@context/CartContext';


interface ProductProps {
    productData: Product
}

export default function ProductUI({ productData }: ProductProps) {
    const { name, image_url, prix, dimensions, support, technic, product_id } = productData;
    const [productInCart, setProductInCart] = useState(false);
    const { addItemToCart, cart } = useCart();

    async function handleClick(id: string | number) {
        const availability = await checkProductAvailability(id);
        if (availability === "available" && !productInCart) {
            const cookieName = 'cart';
            const cookieValue = Cookies.get(cookieName);
            let cart = cookieValue ? JSON.parse(cookieValue) : [];
            setProductInCart(true);
            cart.push({
                item: product_id
            });
            Cookies.set('cart', JSON.stringify(cart), { expires: 7 });

            addItemToCart({ item: product_id });
            const cookieStored = Cookies.get(cookieName);
            const cookieStoredParsed = cookieStored ? JSON.parse(cookieStored) : 'No cookie found';
        }

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

            <button className={`text-white  rounded p-4 flex justify-center align-center text-center ${productInCart ? "bg-black hover:bg-black opacity-50 cursor-default" : "bg-black hover:bg-gray-700"}`} onClick={() => { handleClick(product_id) }}>{productInCart ? "Ce produit est dans votre panier" : "Ajouter au panier"}</button>
        </div>
    )
}