import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const categories: Record<string, string> = {
  procesamiento: 'Procesamiento',
  refrigeracion: 'Refrigeración',
  empaque: 'Empaque',
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return { title: 'Producto no encontrado | Antigravity' };
  return {
    title: `${product.name} | Antigravity`,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product || !product.active) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      active: true,
    },
    take: 3,
  });

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        <Link href="/catalogo" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">

          <div className="h-80 md:h-[450px] w-full relative bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">
              {categories[product.category] || product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 font-display">
              {product.name}
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 whitespace-pre-line">
              {product.description}
            </p>

            <Link
              href={`/contacto?product=${product.id}`}
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all w-full sm:w-auto"
            >
              Solicitar Cotización <ArrowRight size={18} />
            </Link>
          </div>

        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 font-display">Equipos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <Link
                  key={p.id}
                  href={`/catalogo/${p.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group block"
                >
                  <div className="h-48 w-full relative bg-gray-100">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
