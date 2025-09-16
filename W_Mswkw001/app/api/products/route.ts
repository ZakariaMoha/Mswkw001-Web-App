import { NextRequest, NextResponse } from 'next/server';
import { addProduct, getProducts, updateProduct, deleteProduct } from '@/lib/google-sheets';
import { Product } from '@/types/product';

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, imageURL, stock, badge } = body;

    if (!name || !description || !price || !category || !imageURL) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product: Omit<Product, 'id'> = {
      name,
      description,
      price: Number(price),
      category,
      imageURL,
      stock,
      badge,
    };

    await addProduct(product);

    return NextResponse.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, price, category, imageURL, stock, badge } = body;

    const missingFields = [];
    if (!id) missingFields.push('id');
    if (!name) missingFields.push('name');
    if (!description) missingFields.push('description');
    if (!price && price !== 0) missingFields.push('price');
    if (!category) missingFields.push('category');
    if (!imageURL) missingFields.push('imageURL');

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, { status: 400 });
    }

    const product: Omit<Product, 'id'> = {
      name,
      description,
      price: Number(price),
      category,
      imageURL,
      stock,
      badge,
    };

    await updateProduct(id, product);

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await deleteProduct(id);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
