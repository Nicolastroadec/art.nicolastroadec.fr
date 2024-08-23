'use client';
import Product from '@/app/(models)/Product';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { product_id, type, name, prix, dimensions, support, technic, image_url, status } = product;

    return (
        <div className="bg-white shadow-md p-4 w-1/3 relative">
            <div className="flex">
                <Image width={400} height={400} src={image_url} alt={name} className="hover:cursor-pointer w-[90%] h-[90%] object-contain" />
            </div>
            <div className="text-black absolute right-[-65px] top-0 z-10 bg-white p-5 rounded shadow-md w-fit">
                <p>{type}</p>
                <p>{support}</p>
                <p>{technic}</p>
                <p>{dimensions} cm</p>
                <p>{status}</p>
            </div>
            <h2 className="text-xl text-center text-black font-bold">{name}</h2>
            <p className="text-center text-black">{prix} €</p>
        </div>
    );
}
