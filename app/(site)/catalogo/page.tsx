import Link from 'next/link';
import Image from 'next/image';
import { Filter, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Catálogo de Equipos | Antigravity',
  description: 'Explora nuestro catálogo de maquinaria industrial para procesamiento de alimentos.',
};

// Product data with real MIGSA images
const products = [
  { id: '1', name: 'Empacadora al Vacío', category: 'empaque', desc: 'Sellado hermético al vacío para prolongar la vida útil de tus productos.', img: '/images/products/empacadora-al-vacio.webp' },
  { id: '2', name: 'Sierra de Carne y Hueso', category: 'procesamiento', desc: 'Sierra industrial de piso para cortes de alta precisión en carne y hueso.', img: '/images/products/sierra-carne.jpg' },
  { id: '3', name: 'Barra Fría para Ensaladas', category: 'refrigeracion', desc: 'Conservación óptima con control digital de temperatura para buffet.', img: '/images/products/barra-fria-ensaladas.webp' },
  { id: '4', name: 'Madurador de Carnes', category: 'refrigeracion', desc: 'Maduración controlada para obtener cortes premium de calidad gourmet.', img: '/images/products/madurador-carnes.jpg' },
  { id: '5', name: 'Amasadora de Espiral 20L', category: 'procesamiento', desc: 'Mezclado profesional para masas de panadería con motor de alta potencia.', img: '/images/products/amasadora-espiral.webp' },
  { id: '6', name: 'Tostador Eléctrico Comercial', category: 'empaque', desc: 'Tostado uniforme de alta velocidad con bandas transportadoras para producción continua.', img: '/images/products/tostador-electrico.webp' },
];

export default function Catalogo({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const currentCategory = searchParams.category || 'todos';
  
  const filteredProducts = currentCategory === 'todos' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  const categories = [
    { id: 'todos', name: 'Todos los Equipos' },
    { id: 'procesamiento', name: 'Procesamiento' },
    { id: 'refrigeracion', name: 'Refrigeración' },
    { id: 'empaque', name: 'Empaque' }
  ];

  return (
    <>
      <section className="bg-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Catálogo de <span className="text-primary">Equipos</span></h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Encuentra la maquinaria ideal para tu línea de producción. Equipos robustos, eficientes y garantizados.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          
          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Filter size={20} /> Filtrar por categoría:
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={cat.id === 'todos' ? '/catalogo' : `/catalogo?category=${cat.id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentCategory === cat.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <article key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="h-64 w-full relative bg-gray-100 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark/20 backdrop-blur-sm">
                    <span className="bg-white text-dark px-4 py-2 rounded-full font-medium text-sm">Ver Detalles</span>
                  </div>
                </div>
                <div className="p-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                    {categories.find(c => c.id === product.category)?.name}
                  </span>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.desc}</p>
                  
                  <Link href={`/contacto?product=${product.id}`} className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all w-full justify-between group-hover:text-secondary">
                    Solicitar Cotización <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
              <Link href="/catalogo" className="text-primary mt-4 inline-block font-medium hover:underline">
                Ver todos los productos
              </Link>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
