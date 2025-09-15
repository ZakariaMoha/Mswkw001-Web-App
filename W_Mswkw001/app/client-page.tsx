'use client';

import { useState } from 'react';
import { Product, Testimonial } from '@/types/product';
import { useCart } from '@/hooks/useCart';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import BenefitsSection from '@/components/BenefitsSection';
import TutorialSection from '@/components/TutorialSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import SunnahSection from '@/components/SunnahSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import VideoPlayer from '@/components/VideoPlayer';

interface ClientPageProps {
  products: Product[];
  testimonials: Testimonial[];
}

export default function ClientPage({ products, testimonials }: ClientPageProps) {
  const cart = useCart();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProductShowcase products={products} />
        <BenefitsSection />
        <TutorialSection />
        <section id="video" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
                Watch Our Story
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Learn more about the tradition and benefits of miswak.
              </p>
            </div>
            <VideoPlayer />
          </div>
        </section>
        {testimonials.length > 0 && (
          <section id="testimonials" className="py-20 bg-gradient-to-br from-yellow-50 to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
                  Happy Customers
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
                  What Our Customers Say
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of satisfied customers who have transformed their oral care routine with our authentic miswak sticks.
                </p>
              </div>
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </section>
        )}
        <SunnahSection />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}