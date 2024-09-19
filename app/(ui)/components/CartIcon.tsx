'use client';

import Image from 'next/image';

export default function CartIcon({ cart }: { cart: any }) {
    return (
        <>
            <Image width="20" height="20" className="w-[20px] h-[20px]" src='/img/cart-icon.png' alt="Panier" /><span className="ml-2">{cart.cart.length}</span>
        </>)
} 