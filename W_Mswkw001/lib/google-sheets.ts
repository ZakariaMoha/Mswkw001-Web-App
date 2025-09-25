import { JWT } from 'google-auth-library';
import { Product, Testimonial } from '@/types/product';

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')!;

const serviceAccountAuth = new JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

function generateUniqueId() {
  // Simple unique id generator using timestamp and random number
  return 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

export async function getProducts(): Promise<Product[]> {
  const { GoogleSpreadsheet } = await import('google-spreadsheet');
  const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const products: Product[] = rows
    .filter((row) => {
      const name = row.get('name');
      // Exclude header row and rows with empty name
      return name && name.toString().toLowerCase() !== 'name' && name.toString().trim() !== '';
    })
    .map((row) => ({
      id: row.get('id') || '',  // Use dedicated id column
      name: row.get('name') || '',
      description: row.get('description') || '',
      price: parseFloat(row.get('price')) || 0,
      imageURL: row.get('image') || '',
      category: row.get('category') || 'General',
      stock: row.get('stock') || 'In Stock',
      badge: row.get('badge') || undefined,
    }));

  return products;
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<void> {
  try {
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const newId = generateUniqueId();

    await sheet.addRow({
      id: newId,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.imageURL,
      category: product.category,
      stock: product.stock || 'In Stock',
      badge: product.badge || '',
    });
  } catch (error) {
    console.error('Error adding product to Google Sheets:', error);
    throw error;
  }
}

export async function updateProduct(id: string, product: Omit<Product, 'id'>): Promise<void> {
  try {
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    for (const row of rows) {
      const rowId = row.get('id');
      if (rowId === id) {
        row.set('name', product.name);
        row.set('description', product.description);
        row.set('price', product.price.toString());
        row.set('image', product.imageURL);
        row.set('category', product.category);
        row.set('stock', product.stock || 'In Stock');
        row.set('badge', product.badge || '');
        await row.save();
        return;
      }
    }
    throw new Error('Product not found');
  } catch (error) {
    console.error('Error updating product in Google Sheets:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    for (const row of rows) {
      const rowId = row.get('id');
      if (rowId === id) {
        await row.delete();
        return;
      }
    }
    throw new Error('Product not found');
  } catch (error) {
    console.error('Error deleting product from Google Sheets:', error);
    throw error;
  }
}
