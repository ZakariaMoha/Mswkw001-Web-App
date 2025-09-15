'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import axios from 'axios';

interface ProductEditFormProps {
  product: Product | null;
  onClose: () => void;
  onProductUpdated: () => void;
}

export default function ProductEditForm({ product, onClose, onProductUpdated }: ProductEditFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [stock, setStock] = useState('');
  const [badge, setBadge] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImageURL(product.imageURL);
      setStock(product.stock || '');
      setBadge(product.badge || '');
    }
  }, [product]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setImageURL(uploadRes.data.imageUrl);
      } catch (err) {
        setError('Failed to upload image');
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!product || !name || !description || !price || !category || !imageURL) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const updatedProduct = {
        id: product.id,
        name,
        description,
        price: Number(price),
        category,
        imageURL,
        stock,
        badge,
      };

      await axios.put('/api/products', updatedProduct);

      alert('Product updated successfully!');
      onProductUpdated();
      onClose();
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error(err);
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
            min={0}
            step="0.01"
          />

          <label className="block mb-2 font-semibold">Category</label>
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-semibold">Image URL</label>
          <input
            type="text"
            value={imageURL}
            onChange={e => setImageURL(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-semibold">Or Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />

          <label className="block mb-2 font-semibold">Stock</label>
          <input
            type="text"
            value={stock}
            onChange={e => setStock(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />

          <label className="block mb-2 font-semibold">Badge</label>
          <input
            type="text"
            value={badge}
            onChange={e => setBadge(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={uploading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
