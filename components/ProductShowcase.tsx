'use client';

import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductShowcaseProps {
  products: Product[];
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
            Premium Quality
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
            Our Miswak Collection
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully selected range of authentic miswak sticks, 
            sourced from the finest Salvadora Persica trees for optimal oral health benefits.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌿</div>
            <p className="text-xl text-neutral-600">
              Loading our premium miswak collection...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-green-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              🌟 Quality Guarantee
            </h3>
            <p className="text-green-700">
              All our miswak sticks are freshly sourced, naturally preserved, and tested for quality. 
              We ensure you receive the authentic Sunnah experience with every product.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}