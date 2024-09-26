'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CartIcon from '@components/CartIcon';
import SignOutButton from './SignOut';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { CartContext } from '@context/context';

export default function NavBar({ sessionProp }: any) {
    const { data: session, status } = useSession();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { cart } = useContext(CartContext);


    useEffect(() => {

        if (status === 'unauthenticated' && sessionProp?.user?.name !== undefined) {
            setIsAuthenticated(false);
        }

        if (status === 'authenticated' || sessionProp?.user?.name !== undefined) {
            setIsAuthenticated(true);
        }


    }, [status, sessionProp]);



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
        },
        {
            name: 'Login',
            url: '/login',
        }
    ]

    return (

        <div className="w-full flex justify-center pt-5 pb-5 fixed top-0 bg-white z-20 shadow-md">
            <div className="w-1/2 flex justify-around"> {links.map(link => {
                return (<Link className="text-black flex" href={link.url} key={link.name}>{link.name !== "Panier" ? link.name : ''}
                    {link.name === 'Panier' && <CartIcon cart={cart} />}
                </Link>)
            })}
                {isAuthenticated ? <SignOutButton /> : null}
            </div>

        </div>)
}