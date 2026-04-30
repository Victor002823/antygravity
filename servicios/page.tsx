import Link from 'next/link';
import { Settings, Wrench, GraduationCap, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Servicios | Antigravity',
  description: 'Nuestros servicios de instalación, mantenimiento, y soporte técnico.',
};

const services = [
  {
    icon: <Settings size={40} className="text-primary" />,
    title: 'Instalación y Puesta en Marcha',
    desc: 'Aseguramos que tu equipo comience a operar bajo las especificaciones exactas del fabricante, calibrando cada parámetro para tu producto específico.'
  },
  {
    icon: <Wrench size={40} className="text-secondary" />,
    title: 'Mantenimiento Preventivo y Correctivo',
    desc: 'Planes de mantenimiento programado para evitar paros de línea y servicio de emergencia con respuesta rápida para solucionar cualquier avería.'
  },
  {
    icon: <GraduationCap size={40} className="text-primary" />,
    title: 'Capacitación de Operadores',
    desc: 'Entrenamiento teórico y práctico in situ para tu personal, garantizando un uso seguro, eficiente y que prolongue la vida útil de la maquinaria.'
  },
  {
    icon: <ShieldAlert size={40} className="text-secondary" />,
    title: 'Garantía y Refacciones Originales',
    desc: 'Stock permanente de piezas de desgaste y refacciones críticas originales para minimizar tiempos muertos ante cualquier eventualidad.'
  }
];

const faqs = [
  { q: '¿Tienen cobertura técnica a nivel nacional?', a: 'Sí, contamos con una red de ingenieros de servicio que pueden trasladarse a cualquier punto del país en un máximo de 48 horas para emergencias.' },
  { q: '¿Los equipos incluyen instalación?', a: 'La mayoría de nuestros equipos industriales incluyen el servicio de puesta en marcha estándar. Para proyectos complejos o llave en mano, se cotiza la instalación de tuberías, cableado o modificaciones a la planta por separado.' },
  { q: '¿Qué incluye la póliza de mantenimiento?', a: 'Nuestras pólizas anuales incluyen visitas programadas, revisión de puntos críticos, lubricación, ajuste de componentes mecánicos, actualización de software (si aplica) y reporte técnico de estado.' },
  { q: '¿Es posible solicitar refacciones si el equipo no está en garantía?', a: 'Absolutamente. Ofrecemos venta directa de refacciones originales para todos los equipos de nuestro catálogo, independientemente del estatus de su garantía.' }
];

export default function Servicios() {
  return (
    <>
      {/* Hero Servicios */}
      <section className="bg-gray-100 py-20 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-display">
              Nuestros <span className="text-secondary">Servicios</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              La venta del equipo es solo el inicio de nuestra relación. En Antigravity contamos con un departamento técnico especializado para garantizar que tu inversión rinda al máximo durante toda su vida útil.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-3xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group bg-white">
                <div className="shrink-0 w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 font-display">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                  <Link href={`/contacto?service=${encodeURIComponent(service.title)}`} className="inline-flex items-center text-primary font-medium hover:underline gap-2">
                    Solicitar servicio <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-display flex items-center justify-center gap-3">
              <HelpCircle className="text-secondary" size={32} /> Preguntas Frecuentes
            </h2>
            <p className="text-gray-400">Resolvemos tus dudas sobre nuestro servicio posventa.</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h4 className="text-lg font-bold mb-3 text-white">{faq.q}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">¿Tienes alguna otra duda?</p>
            <Link href="/contacto" className="bg-white text-dark px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors inline-block">
              Contáctanos Directamente
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
