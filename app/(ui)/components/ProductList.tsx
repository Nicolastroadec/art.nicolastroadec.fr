import getProducts from '@lib/get-data';
import Product from '@models/Product';
import ProductCard from './ProductCard';
export default async function ProductList() {

    let products: Product[] = await getProducts();

    return (
        <div className="flex flex-wrap">
            <pre>{JSON.stringify(products, null, 2)}</pre>            {
                products.map((product: Product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>)

}