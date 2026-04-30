'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image
            src="/images/logo.png"
            alt="Elite Titan Culinary Logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />

          <span className="text-gray-900 text-xl md:text-2xl tracking-wide">
            <span className="font-extrabold">
              Elite Titan
            </span>{' '}
            <span className="text-primary font-normal">
              Culinary
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : isScrolled ? 'text-gray-800' : 'text-gray-800'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/contacto"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Cotizar
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden z-50 p-2 text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center gap-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-semibold transition-colors ${isActive ? 'text-primary' : 'text-gray-800 hover:text-primary'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header >
  );
}
