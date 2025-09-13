'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'How to Use', href: '#tutorial' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-neutral-200 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              className="text-2xl font-bold text-green-700"
              whileHover={{ scale: 1.05 }}
            >
              🌿 Miswak World
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-neutral-600 hover:text-green-700 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="https://instagram.com/miswak_world25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-green-700 transition-colors"
            >
              <Instagram size={20} />
            </a>
            
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-neutral-200"
          >
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-neutral-600 hover:text-green-700 transition-colors font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}