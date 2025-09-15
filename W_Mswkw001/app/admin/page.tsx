'use client';

import { useState } from 'react';
import AdminProductForm from '@/components/AdminProductForm';

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey(prev => prev + 1);
    alert('Product added successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
        <AdminProductForm onProductAdded={handleProductAdded} key={refreshKey} />
      </div>
    </div>
  );
}
