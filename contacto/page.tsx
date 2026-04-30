import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
  title: 'Contacto | Antigravity',
  description: 'Contáctanos para cotizaciones, soporte técnico o información general.',
};

export default function Contacto() {
  return (
    <>
      <section className="bg-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Ponte en <span className="text-primary">Contacto</span></h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Estamos listos para atender tus requerimientos. Un asesor especializado te contactará a la brevedad.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Información Directa</h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Dirección</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Av. Industrial 123, Nave 4.<br />
                        Parque Tecnológico Industrial,<br />
                        Ciudad de México, CP 01234
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Teléfonos</h4>
                      <p className="text-gray-600 text-sm mb-1">Ventas: +52 (55) 1234-5678</p>
                      <p className="text-gray-600 text-sm">Soporte: +52 (55) 8765-4321</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Correo Electrónico</h4>
                      <p className="text-gray-600 text-sm mb-1">ventas@antigravity.com</p>
                      <p className="text-gray-600 text-sm">soporte@antigravity.com</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Horario de Atención</h4>
                      <p className="text-gray-600 text-sm mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 text-sm">Sábados: 9:00 AM - 1:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Interactive Map */}
              <div className="bg-gray-200 w-full h-64 rounded-2xl overflow-hidden relative border border-gray-300 shadow-inner group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120462.62890693514!2d-99.21396264627195!3d19.432607736697855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce192e2170668b%3A0xb3fc462d733ce8e!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1683236752044!5m2!1ses-419!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="Ubicación Antigravity"
                ></iframe>
              </div>
            </div>

            {/* Form Area */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
