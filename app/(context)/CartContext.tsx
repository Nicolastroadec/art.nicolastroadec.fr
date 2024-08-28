// app/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
    cart: any[];
    addItemToCart: (product: any) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);



export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<any[]>([]);

    const addItemToCart = (product: any) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
}
export default function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export const hello = 'Hello';