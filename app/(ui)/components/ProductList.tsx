import getProducts from '@/app/(lib)/get-data';
import Product from '@/app/(models)/Product';
import ProductCard from './ProductCard';
export default async function ProductList() {

    const products = await getProducts();

    return (
        <div className="flex flex-wrap w-[80%] m-auto">
            {
                products.map((product: Product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>)

}