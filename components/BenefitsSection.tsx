'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Wind, BookOpen, Star } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Strengthens Gums',
    description: 'Natural tannins and fluoride compounds strengthen gum tissue and prevent bleeding.',
    color: 'text-red-500'
  },
  {
    icon: Sparkles,
    title: 'Whitens Teeth Naturally',
    description: 'Gentle abrasive action removes stains without damaging enamel, revealing natural whiteness.',
    color: 'text-yellow-500'
  },
  {
    icon: Shield,
    title: 'Antibacterial Properties',
    description: 'Natural compounds fight harmful bacteria, reducing plaque formation and tooth decay.',
    color: 'text-blue-500'
  },
  {
    icon: Wind,
    title: 'Freshens Breath',
    description: 'Essential oils provide long-lasting freshness while eliminating odor-causing bacteria.',
    color: 'text-green-500'
  },
  {
    icon: BookOpen,
    title: 'Revives the Sunnah',
    description: 'Follow the blessed tradition of Prophet Muhammad (PBUH) for spiritual and physical benefits.',
    color: 'text-purple-500'
  },
  {
    icon: Star,
    title: '100% Natural',
    description: 'No chemicals, no additives - just pure, natural oral care as intended by nature.',
    color: 'text-orange-500'
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
            Natural Benefits
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
            Why Choose Miswak?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Discover the incredible health benefits that have made miswak the preferred oral care method 
            for over 1400 years, backed by both tradition and modern science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-opacity-10 mb-6 ${benefit.color.replace('text-', 'bg-')}`}>
                  <IconComponent size={32} className={benefit.color} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              🔬 Scientifically Proven Benefits
            </h3>
            <p className="text-lg opacity-90">
              Multiple studies have confirmed that miswak is as effective as modern toothbrushes, 
              while providing additional benefits through its natural medicinal properties. 
              Experience the perfect blend of ancient wisdom and scientific validation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}