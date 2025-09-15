import { NextRequest, NextResponse } from 'next/server';
import { addProduct } from '@/lib/google-sheets';
import { Product } from '@/types/product';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, imageURL } = body;

    if (!name || !description || !price || !category || !imageURL) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product: Omit<Product, 'id'> = {
      name,
      description,
      price: Number(price),
      category,
      imageURL,
    };

    await addProduct(product);

    return NextResponse.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
