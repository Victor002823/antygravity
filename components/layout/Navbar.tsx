'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Inici', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={80} height={80} />
          <span className="font-bold text-lg">Elite Titan Culinary</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              className={pathname === l.path ? 'text-primary' : 'text-gray-700'}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-white border-t">
          {links.map((l) => (
            <Link key={l.path} href={l.path} onClick={() => setOpen(false)}>
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}