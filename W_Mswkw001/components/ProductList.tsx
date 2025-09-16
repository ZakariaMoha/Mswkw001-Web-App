'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import axios from 'axios';

interface ProductListProps {
  onEdit: (product: Product) => void;
  refreshTrigger: number;
}

export default function ProductList({ onEdit, refreshTrigger }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/products?id=${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
      console.error(err);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-300 rounded p-4">
              <img src={product.imageURL} alt={product.name} className="w-full h-32 object-cover mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm">Price: kshs {product.price}</p>
              <p className="text-sm">Category: {product.category}</p>
              {product.stock && <p className="text-sm">Stock: {product.stock}</p>}
              {product.badge && <p className="text-sm">Badge: {product.badge}</p>}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
