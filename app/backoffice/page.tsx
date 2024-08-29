'use client';

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Product from '@models/Product';

export default function page() {
    const artItems: Array<Product> = [];

    return (
        <div>
            <h1>Les oeuvres présentes sur le site</h1>
            {artItems.map(art => (
                <div key={art.product_id}>
                    <h2>{art.name}</h2>
                    <CldImage
                        alt="sample image"
                        src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
                        width="500" // Transform the image: auto-crop to square aspect_ratio
                        height="500"
                        crop={{
                            type: 'auto',
                            source: true
                        }}
                    />                    <button>Modifier</button>
                    <button>Supprimer</button>
                    <select name="Changer le statut" id="">
                        <option value="available" id="available">Disponible</option>
                        <option value="sold" id="sold">Vendue</option>
                    </select>
                </div>
            ))}
            <h2>Ajouter une oeuvre</h2>
            <form className="flex flex-col" action="">
                <label htmlFor="name">Nom de l{"'"}oeuvre</label>
                <input className="border-2 border-solid border-black" type="text" id="name" name="name" />
                <label htmlFor="type">Type d'oeuvre</label>
                <input className="border-2 border-solid border-black" type="text" id="type" name="type" />
                <label htmlFor="prix">Prix</label>
                <input className="border-2 border-solid border-black" type="number" id="prix" name="prix" />
                <label htmlFor="dimensions">Dimensions</label>
                <input className="border-2 border-solid border-black" type="text" id="dimensions" name="dimensions" />
                <label htmlFor="support">Support</label>
                <input className="border-2 border-solid border-black" type="text" id="support" name="support" />
                <label htmlFor="technic">Technique</label>
                <input className="border-2 border-solid border-black" type="text" id="technic" name="technic" />
                <label htmlFor="image_url">Url de l'image</label>
                <input className="border-2 border-solid border-black" type="text" id="image_url" name="image_url" />
                <button type="submit">Ajouter</button>
            </form>
            <CldUploadWidget uploadPreset="ml_default">
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}


