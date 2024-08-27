import { db } from '@vercel/postgres';
import { products } from '@/app/(lib)/placeholder-data';

const client = await db.connect();

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      type VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      prix INT NOT NULL,
      dimensions VARCHAR(255) NOT NULL,
      support VARCHAR(255) NOT NULL,
      technic VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (product_id, type, name, prix, dimensions, support, technic, image_url, status)
        VALUES (${product.product_id}, ${product.type}, ${product.name}, ${product.prix}, ${product.dimensions}, ${product.support}, ${product.technic}, ${product.image_url}, ${product.status})
        ON CONFLICT (product_id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedProducts();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
