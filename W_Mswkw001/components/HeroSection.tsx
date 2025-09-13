'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Assalamu Alaikum! I want to order miswak from Miswak World 🌿');
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-600/10 to-yellow-500/20">
        <img
          src="https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Natural miswak sticks"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Star size={16} className="mr-2 fill-current" />
              100% Natural & Sunnah Approved
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-green-800">Revive the Sunnah</span>
            <br />
            <span className="text-yellow-600">🌿 Refresh Your</span>
            <br />
            <span className="text-green-700">Smile Naturally</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the authentic tradition of miswak. Strengthen your teeth, 
            freshen your breath, and follow the blessed Sunnah with our premium quality miswak sticks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle size={24} className="mr-3" />
              Order Now on WhatsApp
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-green-600 text-green-600 hover:bg-green-50"
            >
              View Products
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: '🦷', title: 'Strengthens Gums', desc: 'Natural antibacterial properties' },
              { icon: '✨', title: 'Whitens Teeth', desc: 'Gentle, natural whitening' },
              { icon: '📜', title: 'Sunnah Practice', desc: 'Following Prophet\'s guidance' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-neutral-800 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Curved bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}