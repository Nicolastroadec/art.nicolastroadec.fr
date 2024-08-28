'use client';

import Link from 'next/link';
import CartIcon from '@components/CartIcon';
import cartProvider from "@context/CartContext";


export default function NavBar() {

    const cart = cartProvider();

    interface Links {
        name: string;
        url: string;
    }

    const links: Links[] = [
        {
            name: "Accueil",
            url: '/',
        },
        /*   {
              name: 'Impressions',
              url: '/impressions',
          }, */
        {
            name: 'A propos',
            url: '/a-propos',
        },
        {
            name: 'Contact',
            url: '/contact',
        },
        {
            name: 'Panier',
            url: '/panier',
        }
    ]

    return (<div className="w-full flex justify-center pt-5 pb-5 fixed top-0 bg-white z-20 shadow-md">
        <div className="w-1/2 flex justify-around"> {links.map(link => {
            return (<Link className="text-black" href={link.url} key={link.name}>{link.name !== "Panier" ? link.name : ''}
                {link.name === 'Panier' && <CartIcon cart={cart} />}
            </Link>)
        })}</div>


    </div>)
}