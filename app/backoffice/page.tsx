import AddAProduct from '@components/backoffice/AddAProduct';
import Product from '@models/Product';
import getProducts from '@lib/get-data';

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
            <table>
                <thead>
                    <tr>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">ID du produit</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Type</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Nom de l'oeuvre</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Prix</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Dimensions</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Support</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Technique</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">URL de l'image</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Statut</th>
                        <th className="border-solid border-2 border-black bg-black text-white px-4 py-4">Slug</th>
                    </tr>
                </thead>


                <tbody>
                    {artItemsCopy.map(art => (
                        <tr key={art.product_id}>
                            <th className="border-solid border-black border-2 font-light">{art.product_id}</th>
                            <th className="border-solid border-black border-2 font-light">{art.type}</th>
                            <th className="border-solid border-black border-2 font-light">{art.name}</th>
                            <th className="border-solid border-black border-2 font-light">{art.prix}</th>
                            <th className="border-solid border-black border-2 font-light">{art.dimensions}</th>
                            <th className="border-solid border-black border-2 font-light">{art.support}</th>
                            <th className="border-solid border-black border-2 font-light">{art.technic}</th>
                            <th className="border-solid border-black border-2 font-light">{art.image_url}</th>
                            <th className="border-solid border-black border-2 font-light">{art.status}</th>
                            <th className="border-solid border-black border-2 font-light">{art.slug}</th>
                        </tr>

                    ))}
                </tbody>
            </table>
            <AddAProduct />
        </div >
    );
}


