'use client';
import Product from '@models/Product';
import Cookies from 'js-cookie';

interface ProductProps {
    productData: Product
}

export default function ProductUI({ productData }: ProductProps) {
    const { name, image_url, prix, dimensions, support, technic, product_id } = productData;
    async function addItemToCart(id: string | number) {
        const checkAvailability = async (id: any) => {
            try {
                const response = await fetch(`/api/check-product?id=${id}`);
                const data = await response.json();

                if (response.ok) {
                    console.log(data.status);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
        checkAvailability(id);
        const cookieName = 'cart';
        const cookieValue = Cookies.get(cookieName);
        let cart = cookieValue ? JSON.parse(cookieValue) : [];
        cart.push({
            item: product_id
        });
        Cookies.set('cart', JSON.stringify(cart), { expires: 7 });

        const cookieStored = Cookies.get(cookieName);
        const cookieStoredParsed = cookieStored ? JSON.parse(cookieStored) : 'No cookie found';
    }
    return (
        <div className="w-1/3 ">
            <h1 className="text-black">{name}</h1>
            <p className="text-black"><strong>Prix :</strong> {prix} €</p>
            <p className="text-black"><strong>Dimensions :</strong> {dimensions} cm</p>
            <p className="text-black"><strong>Support :</strong> {support}</p>
            <p className="text-black"><strong>Technique utilisée :</strong> {technic}</p>
            <button className="text-white bg-black hover:bg-gray-700 rounded p-4 flex justify-center align-center text-center" onClick={() => { addItemToCart(product_id) }}>Ajouter au panier</button>
        </div>
    )
}