'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevenir scroll en body cuando el menú está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-50">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="w-12 md:w-[60px]" />
          <span className="font-bold text-lg tracking-tight text-gray-800">Elite Titan Culinary</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {links.map((l) => {
              const isActive = pathname === l.path;
              return (
                <Link
                  key={l.path}
                  href={l.path}
                  className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                    isActive ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {l.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </div>
          <Link href="/contacto" className="hidden lg:flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm hover:bg-primary hover:text-white transition-colors">
            <Phone size={16} />
            <span>Asesoría</span>
          </Link>
        </nav>

        {/* Mobile button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-full transition-colors z-50 relative" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-[100dvh] w-[85%] max-w-sm bg-white shadow-2xl z-40 md:hidden flex flex-col"
            >
              {/* Header espaciador para no chocar con la barra superior */}
              <div className="h-[76px] border-b border-gray-100 flex items-center px-6 bg-gray-50/50">
                <span className="font-semibold text-gray-400 uppercase tracking-wider text-xs">Navegación</span>
              </div>
              
              <div className="flex flex-col py-6 px-4 gap-1 flex-grow overflow-y-auto">
                {links.map((l, i) => {
                  const isActive = pathname === l.path;
                  return (
                    <motion.div
                      key={l.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Link 
                        href={l.path} 
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        {l.name}
                        {isActive && <ChevronRight size={18} />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-white mt-auto pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Llámanos ahora</p>
                    <p className="text-sm font-bold text-gray-800">+52 (55) 1234-5678</p>
                  </div>
                </div>
                <Link 
                  href="/contacto" 
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  Solicitar Cotización
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}