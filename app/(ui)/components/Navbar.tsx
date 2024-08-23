import Link from 'next/link';
export default function NavBar() {
    const links = [
        {
            name: "Originaux",
            url: '/',
        },
        {
            name: 'Impressions',
            url: '/impressions',
        },
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
            icon: '/img/cart-icon.png',
        }
    ]

    return (<div className="flex justify-around pt-5 pb-5 fixed w-full top-0 bg-white z-20 shadow-md">
        {links.map(link => {
            return (<Link className="text-black" href={link.url} key={link.name}>{link.name !== "Panier" ? link.name : ''}
                <img className="w-[20px]" src={link.icon} />
            </Link>)
        })}
    </div>)
}