'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a small delay for better entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/525512345678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-slow group"
      aria-label="Contactar por WhatsApp"
    >
      <Phone size={28} className="fill-current" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ¿En qué te podemos ayudar?
      </span>
    </a>
  );
}
