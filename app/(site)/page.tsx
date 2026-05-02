import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Wrench, Truck, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-bg.png"
            alt="Equipos Industriales Antigravity"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-secondary border border-secondary/30 text-sm font-semibold mb-6 tracking-wide uppercase">
              Tecnología para la Industria Alimentaria
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-display">
              Potencia tu Producción con <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Maquinaria de Élite</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Soluciones industriales robustas para procesamiento, empaque y refrigeración. Aumenta la eficiencia de tu planta con equipos respaldados por expertos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] flex items-center justify-center gap-2"
              >
                Explorar Catálogo <ArrowRight size={20} />
              </Link>
              <Link
                href="/contacto"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all backdrop-blur-sm flex items-center justify-center"
              >
                Solicitar Asesoría
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-gray-800">¿Por qué elegir Elite Titan Culinary?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Más que proveedores, somos socios estratégicos en el crecimiento de tu planta procesadora.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Garantía Elite</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Todos nuestros equipos cuentan con póliza de garantía directa de hasta 1 año por defectos de fábrica.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Wrench size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Soporte Técnico 24/7</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Equipo de ingenieros especializados disponibles para mantenimiento preventivo y correctivo inmediato.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Envío Nacional Seguro</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Logística especializada para transportar maquinaria pesada a cualquier punto del país con seguro incluido.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Certificaciones</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Equipos que cumplen con normas internacionales ISO, FDA y CE para garantizar la inocuidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-gray-800">Nuestras Soluciones</h2>
              <p className="text-gray-500 max-w-xl">Descubre nuestro portafolio de equipos clasificados por su función en la línea de producción.</p>
            </div>
            <Link href="/catalogo" className="text-primary font-medium hover:text-primary/80 flex items-center gap-2 whitespace-nowrap">
              Ver todo el catálogo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Maquinaria Pesada",
                desc: "Hornos industriales, mezcladoras de gran capacidad y extrusoras continuas.",
                image: "/images/categories/procesamiento.webp",
                slug: "procesamiento"
              },
              {
                title: "Equipos de Refrigeración",
                desc: "Cámaras frigoríficas, túneles de congelación y abatidores de temperatura.",
                image: "/images/categories/refrigeracion.webp",
                slug: "refrigeracion"
              },
              {
                title: "Líneas de Empaque",
                desc: "Selladoras al vacío, envasadoras automáticas y sistemas de etiquetado.",
                image: "/images/categories/empaque.webp",
                slug: "empaque"
              }
            ].map((cat, i) => (
              <Link key={i} href={`/catalogo?category=${cat.slug}`} className="group relative h-96 rounded-2xl overflow-hidden block">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-dark/10 transition-colors z-20"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{cat.desc}</p>
                  <span className="inline-flex items-center text-white font-medium gap-2">
                    Explorar <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-20 relative overflow-hidden bg-dark">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-10 md:p-16 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">¿Necesitas una solución a la medida?</h2>
              <p className="text-gray-300 text-lg">
                Nuestros ingenieros están listos para analizar tus requerimientos y diseñar una propuesta técnica-comercial que optimice tus recursos.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Link
                href="/contacto"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] block text-center w-full md:w-auto"
              >
                Contactar a Ventas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Empresas que confían en nuestra tecnología</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale">
            {/* Placeholders for logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="text-2xl font-bold font-display text-gray-400">BRAND {i}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
