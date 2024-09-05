// sum.test.js
import { expect, test } from 'vitest'
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TableProducts from '../../../../(ui)/components/backoffice/TableProducts';
import getProducts from '@lib/get-data';
const artItemsCopy = [
    {
        product_id: '39cfbdb5-8a7e-4b4f-9dba-2cb22a367a2e',
        type: 'painting',
        name: 'The Ugly House',
        prix: 30,
        dimensions: '55x30',
        support: 'paper',
        technic: 'watercolor',
        image_url: '/img/IMG_1827.jpg',
        status: 'sold',
        slug: 'the-ugly-house'
    },
    {
        product_id: '27f22ab6-769a-48e6-a7d0-b67bfbfb92cf',
        type: 'drawing',
        name: 'La Meuf sur la barre - remod',
        prix: 65,
        dimensions: '26x30',
        support: 'paper',
        technic: 'pencil',
        image_url: 'https://res.cloudinary.com/ddwmckn86/image/upload/v1725272524/IMG_1837_fp1zth.jpg',
        status: 'sold',
        slug: 'la-meuf-sur-la-barre'
    }
]

async function getArtItems() {
    const products = await getProducts();
    return products;
}

const artItems = await getArtItems();

// Exemple d'un test en utilisant MemoryRouter pour simuler les paramètres de route
test('tableProducts', () => {
    render(
        <MemoryRouter initialEntries={['/backoffice']}>
            <Routes>
                <Route path="/backoffice" element={<TableProducts artItemsCopy={artItems} />} />
            </Routes>
        </MemoryRouter>
    );

    const Name1 = screen.getByText(/The Ugly House/i);
    expect(Name1).toBeTruthy();

    const Name2 = screen.getByText(/Le Couple/i);
    expect(Name2).toBeTruthy();

    const Name3 = screen.getByText(/La Vieille Ruine/i);
    expect(Name3).toBeTruthy();

});



