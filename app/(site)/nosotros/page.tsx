import Image from 'next/image';
import { Target, Eye, Heart, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Nosotros | Antigravity',
  description: 'Conoce la historia, misión y valores de Antigravity, líderes en equipos industriales.',
};

export default function Nosotros() {
  return (
    <>
      {/* Hero Nosotros */}
      <section className="bg-gray-100 py-20 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-display">
              Nuestra <span className="text-primary">Historia</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Fundada con la visión de modernizar la industria alimentaria, Antigravity comenzó como una pequeña distribuidora de equipos básicos. Hoy, nos enorgullece ser un referente nacional en la provisión de maquinaria de procesamiento industrial de alta tecnología. 
              <br/><br/>
              Nuestro compromiso siempre ha sido el mismo: empoderar a los productores de alimentos con herramientas que optimicen su eficiencia, garanticen la calidad y cumplan con los más altos estándares de inocuidad.
            </p>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-primary/5 p-10 rounded-3xl border border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-primary">
                <Target size={120} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-display flex items-center gap-3 relative z-10">
                <Target className="text-primary" size={28} /> Misión
              </h2>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Proveer a la industria alimentaria con soluciones tecnológicas de vanguardia, ofreciendo maquinaria confiable, eficiente y un servicio técnico excepcional que impulse el crecimiento sostenido de nuestros clientes.
              </p>
            </div>
            
            <div className="bg-secondary/5 p-10 rounded-3xl border border-secondary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-secondary">
                <Eye size={120} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-display flex items-center gap-3 relative z-10">
                <Eye className="text-secondary" size={28} /> Visión
              </h2>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Consolidarnos para el año 2030 como el distribuidor de equipos industriales más confiable y tecnológicamente avanzado de América Latina, siendo el socio estratégico por excelencia para empresas de todos los tamaños.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center font-display flex items-center justify-center gap-3">
              <Heart className="text-error" size={32} /> Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Innovación Constante",
                "Calidad sin Compromisos",
                "Servicio Centrado en el Cliente",
                "Integridad Técnica",
                "Sostenibilidad",
                "Trabajo en Equipo",
                "Responsabilidad",
                "Excelencia Operativa"
              ].map((valor, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <CheckCircle2 className="text-success shrink-0" size={24} />
                  <span className="font-medium text-gray-700">{valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Métricas e Indicadores */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">15+</div>
              <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-display">500+</div>
              <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Equipos Instalados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-display">300+</div>
              <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-display">12</div>
              <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Países con Operación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo (Placeholder) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-display">Conoce a Nuestro Equipo</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Detrás de cada equipo instalado hay un grupo de ingenieros, técnicos y asesores comerciales comprometidos con tu éxito.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-64 bg-gray-200 w-full object-cover"></div>
                <div className="p-6 text-left">
                  <h3 className="font-bold text-lg text-gray-800">Nombre del Directivo</h3>
                  <p className="text-primary text-sm font-medium mb-3">Cargo o Posición</p>
                  <p className="text-gray-500 text-sm line-clamp-3">Breve descripción de la experiencia y rol del miembro del equipo dentro de la organización.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
