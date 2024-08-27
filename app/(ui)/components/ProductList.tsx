import getProducts from '@lib/get-data';
import Product from '@models/Product';
import ProductCard from './ProductCard';
export default async function ProductList() {

    const products = await getProducts();

    return (
        <div className="flex flex-wrap">
            {
                products.map((product: Product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>)

}