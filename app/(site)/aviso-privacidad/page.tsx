export const metadata = {
  title: 'Aviso de Privacidad | Elite Titan Culinary',
  description: 'Aviso de privacidad de Elite Titan Culinary.',
};

export default function AvisoPrivacidad() {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-display">Aviso de Privacidad</h1>

        <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
          <p>
            En Elite Titan Culinary, con domicilio en México, somos responsables del uso y protección
            de tus datos personales, y en cumplimiento de la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares, ponemos a tu disposición el presente aviso
            de privacidad.
          </p>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Datos personales que recabamos</h2>
            <p>
              Para las finalidades señaladas en este aviso de privacidad, podemos recabar tus datos
              personales de distintas formas: cuando nos los proporcionas directamente al solicitar
              una cotización, contactarnos a través de nuestro sitio web, correo electrónico, teléfono
              o WhatsApp. Los datos que recabamos pueden incluir: nombre, correo electrónico, número
              telefónico, nombre de empresa y datos relacionados con tu solicitud de cotización o
              información de productos.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Finalidades del tratamiento</h2>
            <p>Tus datos personales serán utilizados para las siguientes finalidades:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Atender y dar seguimiento a solicitudes de cotización e información sobre nuestros productos.</li>
              <li>Contactarte para brindar asesoría comercial sobre equipo industrial.</li>
              <li>Enviarte información relevante sobre nuestros productos y servicios.</li>
              <li>Dar cumplimiento a obligaciones legales y fiscales.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Uso de cookies y tecnologías de rastreo</h2>
            <p>
              Nuestro sitio web puede utilizar cookies y otras tecnologías de rastreo para mejorar
              tu experiencia de navegación. Puedes deshabilitar el uso de cookies desde la
              configuración de tu navegador.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Derechos ARCO</h2>
            <p>
              Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos
              personales (derechos ARCO), así como a revocar el consentimiento que nos hayas otorgado.
              Para ejercer estos derechos, puedes contactarnos a través de los medios señalados en
              nuestra página de contacto.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Cambios al aviso de privacidad</h2>
            <p>
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o
              actualizaciones al presente aviso de privacidad. Cualquier cambio será publicado en
              esta misma página.
            </p>
          </div>

          <p className="text-sm text-gray-400 pt-6 border-t border-gray-100">
            Última actualización: agosto de 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
