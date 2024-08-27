import { getProduct } from '@lib/get-data';
import Image from 'next/image';
import Product from '@models/Product';
import ProductUI from '@components/productUI';
export default async function page({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const productData: Product = await getProduct(slug);
    const { name, image_url } = productData;

    return (
        <div className="flex bg-white">
            <Image className="w-2/3" src={image_url} alt={name} width={600} height={600} />
            <ProductUI productData={productData} />
        </div>
    );
}

