export const metadata = {
  title: 'Términos y Condiciones | Elite Titan Culinary',
  description: 'Términos y condiciones de uso de Elite Titan Culinary.',
};

export default function TerminosCondiciones() {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 font-display">Términos y Condiciones</h1>

        <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
          <p>
            Al acceder y utilizar el sitio web de Elite Titan Culinary, aceptas los presentes
            términos y condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos no
            continuar utilizando este sitio.
          </p>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Información y precios</h2>
            <p>
              La información sobre productos, especificaciones técnicas e imágenes en este sitio
              tiene fines informativos y puede estar sujeta a cambios sin previo aviso. Los precios,
              cuando se muestren, corresponden a valores de referencia en pesos mexicanos (MXN) e
              incluyen IVA, salvo que se indique lo contrario, y no constituyen una oferta vinculante
              hasta ser confirmados formalmente por nuestro equipo de ventas.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Cotizaciones</h2>
            <p>
              Las solicitudes de cotización enviadas a través de este sitio no constituyen una
              compra ni generan obligación alguna hasta que ambas partes confirmen los términos
              de la operación por los canales correspondientes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Garantías</h2>
            <p>
              Los equipos comercializados cuentan con garantía contra defectos de fábrica según lo
              especificado para cada producto. Los términos exactos de garantía se confirman al
              momento de la compra.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Propiedad intelectual</h2>
            <p>
              El contenido de este sitio, incluyendo textos, imágenes, logotipos y diseño, es
              propiedad de Elite Titan Culinary o de sus respectivos titulares, y está protegido
              por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción
              total o parcial sin autorización previa.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Limitación de responsabilidad</h2>
            <p>
              Elite Titan Culinary no se hace responsable por daños derivados del uso indebido de
              la información publicada en este sitio, ni por interrupciones temporales del servicio
              debidas a causas fuera de nuestro control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier
              momento. Los cambios serán efectivos a partir de su publicación en esta página.
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
