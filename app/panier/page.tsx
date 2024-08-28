import Image from 'next/image';
import Product from '@models/Product';

export default function page() {
    const cartItems: Array<Product> = [];

    return (
        <div>
            <h1>Votre panier</h1>
            {cartItems.map(item => (
                <div key={item.product_id}>
                    <h2>{item.name}</h2>
                    <Image src={item.image_url} alt={item.name} width={300} height={300} />
                    <button>Supprimer</button>
                </div>
            ))}
        </div>
    );
}
