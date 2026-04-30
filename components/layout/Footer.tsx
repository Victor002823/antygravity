import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span className="text-primary">Elite Titan</span>Culinary
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Líderes en comercialización de maquinaria y equipos industriales para procesamiento de alimentos con tecnología de punta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Catálogo de Equipos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categorías</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/catalogo?category=procesamiento" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Procesamiento
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=refrigeracion" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Refrigeración
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=empaque" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Empaque
                </Link>
              </li>
              <li>
                <Link href="/catalogo?category=panaderia" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Panadería Industrial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  Av. Industrial 123, Parque Tecnológico, Ciudad de México
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-gray-400 text-sm">
                  +52 (55) 1234-5678
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span className="text-gray-400 text-sm">
                  ventas@antigravity.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Antigravity. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-gray-500 hover:text-white transition-colors text-sm">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-500 hover:text-white transition-colors text-sm">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
