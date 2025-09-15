'use client';

import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, MapPin, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌿</span>
              <h3 className="text-xl font-bold">Miswak World</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              Spreading Sunnah, one smile at a time. Premium quality miswak sticks 
              for authentic oral care following Islamic tradition.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/miswak_world25"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:info@miswakworld.com"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-green-100">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Products', href: '#products' },
                { label: 'Benefits', href: '#benefits' },
                { label: 'How to Use', href: '#tutorial' },
                { label: 'Testimonials', href: '#testimonials' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-green-100">
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <span>+254792095003 {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <span>miswakworld@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram size={16} />
                <span>@miswak_world25</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-green-100 mb-4">
              Follow us on Instagram for daily Sunnah reminders and oral care tips.
            </p>
            <button
              onClick={() => window.open('https://instagram.com/miswak_world25', '_blank')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-green-900 font-semibold px-4 py-2 rounded-full hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 w-full"
            >
              Follow @miswak_world25
            </button>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-green-700 mt-8 pt-8 text-center text-green-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart size={16} className="text-red-400 fill-current" />
              <span>Made with love for the Ummah</span>
            </div>
            <div>
              <p>&copy; {currentYear} Miswak World. All rights reserved.</p>
            </div>
            <div className="text-sm">
              <span>🌿 100% Natural • Halal Certified • Sunnah Approved</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}