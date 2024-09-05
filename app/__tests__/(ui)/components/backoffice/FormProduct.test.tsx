// sum.test.js
import { expect, test } from 'vitest'
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FormEditAProduct from '../../../../(ui)/components/backoffice/FormProduct';

// Exemple d'un test en utilisant MemoryRouter pour simuler les paramètres de route
test('FormEditAProduct', () => {
    render(
        <MemoryRouter initialEntries={['/backoffice']}>
            <Routes>
                <Route path="/backoffice" element={<FormEditAProduct action="updateProduct" />} />
            </Routes>
        </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/Nom de l'oeuvre/i);
    expect(nameInput).toBeTruthy();

    /*  const randomName = screen.getByText(/Le Vieux qui Fume/i);
     expect(randomName).toBeTruthy(); */

});



