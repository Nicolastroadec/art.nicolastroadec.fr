import AddAProduct from '@components/backoffice/AddAProduct';
import Product from '@models/Product';
import getProducts from '@lib/get-data';
import TableProducts from '@components/backoffice/TableProducts';

export default async function page() {
    let artItems: Product[] = [];
    let artItemsCopy: Product[] = [];
    try {
        artItems = await getProducts();
        artItemsCopy = artItems.map(art => ({ ...art }));
    } catch (err) {
        console.error("Erreur lors de la récupération des données : ", err);
    }
    return (
        <div>
            <h1>Les oeuvres présentes sur le site</h1>
            <TableProducts artItemsCopy={artItemsCopy} />
            <AddAProduct />
        </div >
    );
}


