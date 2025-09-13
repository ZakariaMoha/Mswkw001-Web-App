import { getProducts, getTestimonials } from '@/lib/google-sheets';
import ClientPage from './client-page';

export default async function Home() {
  let products = [];
  let testimonials = [];

  try {
    const [productsData, testimonialsData] = await Promise.all([
      getProducts(),
      getTestimonials()
    ]);
    
    products = productsData;
    testimonials = testimonialsData;
  } catch (error) {
    console.error('Error loading data:', error);
    // Fallback data for development
    products = [
      {
        id: 'miswak-premium',
        name: 'Miswak Premium',
        description: 'Fresh Peelu miswak stick from the finest Salvadora Persica trees',
        price: 300,
        imageURL: 'https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        category: 'Premium',
        stock: 'In Stock',
        badge: 'Best Seller'
      },
      {
        id: 'miswak-regular',
        name: 'Miswak Regular',
        description: 'Traditional miswak stick perfect for daily use',
        price: 150,
        imageURL: 'https://images.pexels.com/photos/6663548/pexels-photo-6663548.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        category: 'Regular',
        stock: 'In Stock',
        badge: 'Popular'
      },
      {
        id: 'miswak-bundle',
        name: 'Family Bundle',
        description: 'Pack of 5 miswak sticks for the whole family',
        price: 600,
        imageURL: 'https://images.pexels.com/photos/4239139/pexels-photo-4239139.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
        category: 'Bundle',
        stock: 'In Stock',
        badge: 'Value Pack'
      }
    ];
  }

  return <ClientPage products={products} testimonials={testimonials} />;
}