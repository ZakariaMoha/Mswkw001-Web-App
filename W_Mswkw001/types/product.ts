export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  category: string;
  stock: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
}