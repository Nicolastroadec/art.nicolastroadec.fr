// /app/models/Product.ts
export default interface Product {
    product_id: string | number,
    type: string,
    name: string,
    prix: number,
    dimensions: string,
    support: string,
    technic: string,
    image_url: string,
    status: string,
    slug: string,
}
