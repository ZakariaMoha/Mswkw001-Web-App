import { GoogleSpreadsheet } from 'google-spreadsheet';
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
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    const products: Product[] = rows.map((row) => ({
      id: row.get('ID') || '',
      name: row.get('Name') || '',
      description: row.get('Description') || '',
      price: parseFloat(row.get('Price')) || 0,
      imageURL: row.get('ImageURL') || '',
      category: row.get('Category') || '',
      stock: row.get('Stock') || '',
      badge: row.get('Badge') || undefined,
    }));

    return products.filter(product => product.id && product.name);
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    return [];
  }
}

export async function getTestimonials() {
  // This would be from a second sheet or different columns
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