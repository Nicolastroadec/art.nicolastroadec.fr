'use client';

import { createContext, ReactNode } from 'react';
import { useState } from 'react';
import { checkProductAvailability } from '@lib/get-data';
import Cookies from 'js-cookie';

export const CartContext = createContext({
    cart: 0,
    addToCart: (product_id: string | number) => { },
});

interface CartContextProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {

    const [cart, setCart] = useState(0);

    const addToCart = async (product_id: string | number) => {
        const cookieName = 'cart';

        if (!Cookies.get(cookieName)) {
            console.log('Le cookie existe pas on le crée');
            const cookieValue = [
                {
                    item: product_id
                }
            ]
            Cookies.set(cookieName, JSON.stringify(cookieValue), { expires: 7 });

        } else {
            console.log('Le cookie existe on laugmente');

            const cookieStored = JSON.parse(Cookies.get(cookieName) ?? '');
            console.log(cookieStored);
            const cookieValue = [
                ...cookieStored,
                {
                    item: product_id,
                }
            ]
            Cookies.set(cookieName, JSON.stringify(cookieValue));
        }

        console.log(Cookies.get(cookieName));


        const availability = await checkProductAvailability(product_id);
        if (availability === "available") {
            setCart((prev) => (
                prev + 1
            ));
        }
    }
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider >
    );
};


