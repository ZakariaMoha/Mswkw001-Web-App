import { JWT } from 'google-auth-library';
import { Product } from '@/types/product';

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

export async function getProducts(): Promise<Product[]> {
  try {
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    const products: Product[] = rows.map((row, index) => ({
      id: row.get('name') ? row.get('name').toString().toLowerCase().replace(/\s+/g, '-') + '-' + index : `product-${index}`,
      name: row.get('name') || '',
      description: row.get('description') || '',
      price: parseFloat(row.get('price')) || 0,
      imageURL: row.get('image') || '',
      category: row.get('category') || 'General',
      stock: row.get('stock') || 'In Stock',
      badge: row.get('badge') || undefined,
    }));

    return products.filter(product => product.name);
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    return [];
  }
}

export async function getTestimonials() {
  return [
    {
      id: '1',
      name: 'Ahmad Rahman',
      content: 'Amazing quality miswak! My teeth feel cleaner and stronger. Highly recommend for following the Sunnah.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      content: 'Fresh and natural. Perfect for daily use. Fast delivery and excellent customer service.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Omar Hassan',
      content: 'Best miswak I\'ve tried. Authentic quality and reasonably priced. Will order again!',
      rating: 5,
    },
  ];
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<void> {
  try {
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
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
