'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import axios from 'axios';

interface AdminProductFormProps {
  onProductAdded: () => void;
}

export default function AdminProductForm({ onProductAdded }: AdminProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !description || !price || !category || !imageFile) {
      setError('Please fill all fields and select an image.');
      return;
    }

    setUploading(true);

    try {
      // Upload image to server API
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadRes = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = uploadRes.data.imageUrl;

      // Add product to Google Sheets via API or direct call
      const productData: Omit<Product, 'id'> = {
        name,
        description,
        price: Number(price),
        category,
        imageURL: imageUrl,
      };

      await axios.post('/api/products', productData);

      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImageFile(null);
      onProductAdded();
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <label className="block mb-2 font-semibold">Name</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Price (kshs)</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">kshs</span>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 pl-12"
          required
          min={0}
          step="0.01"
        />
      </div>

      <label className="block mb-2 font-semibold">Category</label>
      <input
        type="text"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
        required
      />

      <button
        type="submit"
        disabled={uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
}
