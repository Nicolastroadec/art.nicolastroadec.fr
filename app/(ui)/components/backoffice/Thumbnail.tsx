'use client';
import Image from 'next/image';
interface ThumbnailProps {
    url: string;
    name: string;
}
export default function Thumbnail({ url, name }: ThumbnailProps) {
    return (
        <Image src={url} width={100} height={100} alt={name} />
    )
}