import getProducts from '@lib/get-data';
import Product from '@models/Product';
import ProductCard from './ProductCard';
export default async function ProductList() {
    let products: Product[] = [];
    try {
        products = await getProducts();
    } catch (err) {
        console.error("Erreur lors de la récupération des données : ", err);
    }

    return (
        <div className="flex flex-wrap">
            <pre>Données stringifiées : {JSON.stringify(products, null, 2)}</pre>            {
                products.map((product: Product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))
            }
        </div>)

}