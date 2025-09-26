'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, setIsOpen } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    setIsOpen(true);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // prevent infinite loop
            target.src = '/fallback-image.png'; // fallback image path
          }}
        />

      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-neutral-900 mb-2">{product.name}</h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-700">kshs {product.price}</span>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Minus size={16} />
            </Button>
            <span className="px-3 py-1 text-sm font-semibold">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}