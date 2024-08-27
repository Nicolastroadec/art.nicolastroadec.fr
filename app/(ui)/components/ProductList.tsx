import getProducts from '@lib/get-data';
import Product from '@models/Product';
import ProductCard from './ProductCard';
export default async function ProductList() {

    let products = await getProducts();

    if (!Array.isArray(products)) {
        products = [];
    }

    return (
        <div className="flex flex-wrap">
            {
                products.map((product: Product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>)

}