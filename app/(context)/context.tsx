'use client';

import { createContext, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';
import { checkProductAvailability } from '@lib/get-data';

interface CartContextType {
    cart: number;
    addToCart: (product_id: string | number) => Promise<boolean>;
    checkIfInCart: (product_id: string | number) => boolean;
}

export const CartContext = createContext<CartContextType>({
    cart: 0,
    addToCart: async () => false,  // Remplace avec une fonction asynchrone par défaut qui retourne false
    checkIfInCart: () => false,  // Fonction qui retourne simplement false par défaut
});

interface CartContextProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartContextProviderProps) => {

    const [cart, setCart] = useState(0);

    const addToCart = async (product_id: string | number): Promise<boolean> => {
        const cookieName = 'cart';

        // Si le cookie n'existe pas
        if (!Cookies.get(cookieName)) {
            const cookieValue = [{ item: product_id }];

            Cookies.set(cookieName, JSON.stringify(cookieValue), { expires: 7 });

            const availability = await checkProductAvailability(product_id);
            if (availability === "available") {
                setCart((prev) => prev + 1);
                return true;
            }
        } else {
            // Si le cookie existe déjà, on vérifie si le produit est dans le panier
            const cookieStored = JSON.parse(Cookies.get(cookieName) ?? '[]');

            if (!cookieStored.find((item: { item: string | number }) => item.item === product_id)) {
                const cookieValue = [
                    ...cookieStored,
                    { item: product_id }
                ];

                Cookies.set(cookieName, JSON.stringify(cookieValue));

                const availability = await checkProductAvailability(product_id);
                if (availability === "available") {
                    setCart((prev) => prev + 1);
                    return true;
                }
            } else {
                console.log('Le produit est déjà dans le panier');
            }
        }

        return false; // Renvoie false si l'ajout n'a pas été fait
    };

    const checkIfInCart = (product_id: string | number): boolean => {
        const cookieName = 'cart';
        const cookieStored = JSON.parse(Cookies.get(cookieName) ?? '[]');
        return cookieStored.some((item: { item: string | number }) => item.item === product_id);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, checkIfInCart }}>
            {children}
        </CartContext.Provider>
    );
};
