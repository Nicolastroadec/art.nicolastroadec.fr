'use client';
import Product from '@models/Product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: Product,
}

export default function ProductCard({ product }: ProductCardProps) {
    const { product_id, type, name, prix, dimensions, support, technic, image_url, status, slug } = product;


    function addItemToCart(product_id: string | number) {
        console.log(product_id)
    }

    return (
        <div className="flex flex-col justify-between bg-white shadow-md p-4 2xl:w-1/4 xl:w-1/3 group">
            <Link href={`produit/${slug}`}>
                <div className="flex relative">
                    <Image width={400} height={400} src={image_url} alt={name} className="hover:cursor-pointer w-full 2xl:h-[400px] xl:h-[300px] object-cover" />
                    <div className="hidden group-hover:flex items-center text-black absolute bottom-0 z-10 bg-white p-2 rounded shadow-md border-solid w-full justify-between border-2">
                        <p className="mr-2 text-center w-1/3">{technic}</p>
                        <p className="mr-2 text-center whitespace-nowrap w-1/3">{dimensions} cm</p>
                        <p className="mr-2 text-center w-1/3" onClick={() => addItemToCart(product_id)}>Ajouter au panier</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl text-center text-black font-bold">{name}</h2>
                    <p className="text-center text-black">{prix} €</p>
                </div>
            </Link>
        </div>
    );
}
