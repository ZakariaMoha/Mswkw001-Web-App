'use client';

import { motion } from 'framer-motion';
import { Book, Heart } from 'lucide-react';

export default function SunnahSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-green-50 relative overflow-hidden">
      {/* Decorative Arabic calligraphy background */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-9xl text-green-600 absolute top-10 right-10 transform rotate-12">
          ﷽
        </div>
        <div className="text-6xl text-amber-600 absolute bottom-20 left-10 transform -rotate-12">
          ☪
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
            Islamic Heritage
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6">
            The Blessed Sunnah
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Follow in the footsteps of our beloved Prophet Muhammad (ﷺ) and discover the 
            spiritual and physical benefits of this blessed practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Book className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Prophetic Tradition
                  </h3>
                  <blockquote className="text-neutral-700 leading-relaxed italic border-l-4 border-amber-300 pl-4">
                    "The Messenger of Allah (ﷺ) said: 'Were it not that I might overburden my Ummah, 
                    I would have commanded them to use the siwak (miswak) before every prayer.'"
                    <footer className="text-sm text-amber-600 mt-2 not-italic">
                      — Sahih Bukhari & Muslim
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    Spiritual Benefits
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Using miswak is not just about oral hygiene - it's a means of gaining spiritual 
                    reward and following the beloved Sunnah. Every use brings you closer to the 
                    blessed way of life demonstrated by our Prophet (ﷺ).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Traditional miswak in Islamic setting"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h4 className="text-lg font-semibold mb-2">
                  🕌 A Tradition of Excellence
                </h4>
                <p className="text-sm opacity-90">
                  Over 1400 years of proven oral care excellence
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-3">🌟</span>
              Join Millions Following the Sunnah
              <span className="ml-3">🌟</span>
            </h3>
            <p className="text-lg opacity-90">
              "Whoever revives a Sunnah that dies after me will have a reward equal to that of 
              the people who follow him, without it detracting from their reward at all."
            </p>
            <p className="text-sm mt-2 opacity-75">— Sunan Ibn Majah</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}