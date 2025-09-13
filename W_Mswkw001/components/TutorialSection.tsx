'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Peel the Bark',
    description: 'Gently peel about 1cm of bark from the tip using your teeth or a knife.',
    icon: '🔧'
  },
  {
    number: '02',
    title: 'Chew the Bristles',
    description: 'Chew the exposed end until it becomes soft and forms natural bristles.',
    icon: '🦷'
  },
  {
    number: '03',
    title: 'Brush Gently',
    description: 'Use gentle circular motions to clean your teeth and massage your gums.',
    icon: '✨'
  },
  {
    number: '04',
    title: 'Store Properly',
    description: 'Rinse and store in a clean, dry place. Cut and refresh as needed.',
    icon: '💧'
  }
];

export default function TutorialSection() {
  return (
    <section id="tutorial" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
            Easy Tutorial
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
            How to Use Miswak
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Follow these simple steps to get the most out of your miswak stick. 
            It's easier than you think and incredibly effective!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Connection line for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-green-200 transform translate-x-4">
                  <div className="absolute right-0 top-0 w-2 h-2 bg-green-400 rounded-full transform -translate-y-0.5"></div>
                </div>
              )}
              
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-3xl">{step.icon}</span>
                <div className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 max-w-2xl mx-auto text-white">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <Play size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Watch Our Tutorial Video
              </h3>
              <p className="opacity-90 mb-6">
                See the proper miswak technique demonstrated step by step on our Instagram @miswak_world25
              </p>
              <button
                onClick={() => window.open('https://instagram.com/miswak_world25', '_blank')}
                className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                View on Instagram
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}