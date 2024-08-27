import { Product } from '@/app/(models)/Product';

describe('Product Model', () => {
    it('should create a product with valid attributes', () => {
        const product: Product = {
            id: '1',
            name: 'Painting',
            description: 'A beautiful painting',
            price: 100,
            imageUrl: 'http://example.com/painting.jpg',
        };

        expect(product.id).toBe('1');
        expect(product.name).toBe('Painting');
        expect(product.description).toBe('A beautiful painting');
        expect(product.price).toBe(100);
        expect(product.imageUrl).toBe('http://example.com/painting.jpg');
    });

    it('should handle optional dimensions attribute', () => {
        const product: Product = {
            id: '2',
            name: 'Drawing',
            description: 'A detailed drawing',
            price: 50,
            imageUrl: 'http://example.com/drawing.jpg',
            dimensions: '20x30 cm',
        };

        expect(product.dimensions).toBe('20x30 cm');
    });
});
