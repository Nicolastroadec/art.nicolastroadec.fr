'use client';

import Image from 'next/image';

export default function CartIcon({ cart }) {
    return (
        <>
            {cart.cart.length}<Image width="20" height="20" className="w-[20px]" src='/img/cart-icon.png' alt="Panier" />
        </>)
} 