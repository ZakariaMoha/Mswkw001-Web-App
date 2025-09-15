'use client';

import { useState } from 'react';
import AdminProductForm from '@/components/AdminProductForm';
import ProductList from '@/components/ProductList';
import ProductEditForm from '@/components/ProductEditForm';
import { Product } from '@/types/product';

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleProductAdded = () => {
    setRefreshKey(prev => prev + 1);
    alert('Product added successfully!');
  };

  const handleProductUpdated = () => {
    setRefreshKey(prev => prev + 1);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleCloseEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
        <AdminProductForm onProductAdded={handleProductAdded} key={refreshKey} />
        <ProductList onEdit={handleEdit} refreshTrigger={refreshKey} />
        {editingProduct && (
          <ProductEditForm
            product={editingProduct}
            onClose={handleCloseEdit}
            onProductUpdated={handleProductUpdated}
          />
        )}
      </div>
    </div>
  );
}
