## **ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE (ERS)**

### **Aplicación Web — Empresa de Venta de Equipos Industriales para Procesamiento de Alimentos**

**Versión:** 1.0 | **Fecha:** Abril 2026 | **Estándar base:** IEEE 830 | **Estado:** Borrador inicial

---

### **1\. INTRODUCCIÓN**

#### **1.1 Propósito**

Este documento define los requisitos funcionales y no funcionales para el desarrollo de una aplicación web moderna para una empresa dedicada a la venta de equipos industriales para el procesamiento de alimentos. El sistema debe presentar la oferta comercial de la empresa, atraer clientes del público general y facilitar el contacto con prospectos interesados.

#### **1.2 Alcance del Sistema**

El sistema se denomina provisionalmente **IndusFoodTech Web** (nombre de empresa por definir). Es una aplicación web institucional de 5 páginas con enfoque en diseño moderno, minimalista y limpio, orientada al público en general (B2C), desarrollada completamente en español.

#### **1.3 Definiciones y Acrónimos**

ERS: Especificación de Requisitos de Software. B2C: Business to Consumer. UI: Interfaz de Usuario. UX: Experiencia de Usuario. CTA: Llamado a la acción. SEO: Optimización para motores de búsqueda. WCAG: Web Content Accessibility Guidelines. MVP: Producto Mínimo Viable.

#### **1.4 Visión General del Documento**

Este ERS está organizado en seis secciones: introducción, descripción general del sistema, requisitos de interfaz, requisitos funcionales, requisitos no funcionales y restricciones del sistema.

---

### **2\. DESCRIPCIÓN GENERAL DEL SISTEMA**

#### **2.1 Perspectiva del Producto**

La aplicación web es el canal digital principal de la empresa. Funciona como vitrina institucional y punto de primer contacto con clientes potenciales. No requiere integración con sistemas externos en su versión inicial (MVP), aunque debe diseñarse con arquitectura extensible para futuras integraciones como CRM, sistemas de cotización o pasarelas de pago.

#### **2.2 Funciones Principales del Sistema**

El sistema debe cumplir las siguientes funciones generales: presentar la identidad y propuesta de valor de la empresa; mostrar el catálogo de equipos industriales por categoría; permitir a los visitantes solicitar información o cotizaciones; proveer información de contacto y ubicación; y posicionar a la empresa como referente técnico en el sector.

#### **2.3 Características del Usuario**

El sistema está dirigido al público general con interés en adquirir o conocer equipos industriales para procesamiento de alimentos. Se distinguen dos perfiles:

**Usuario visitante anónimo:** Persona que navega la web sin registro. Puede ver todo el contenido público, el catálogo de productos y enviar formularios de contacto.

**Administrador del sitio:** Personal interno con acceso a un panel básico para actualizar contenido como productos, textos o datos de contacto. Este perfil es opcional en el MVP y puede diferirse a una segunda fase.

#### **2.4 Restricciones Generales**

La identidad visual (nombre, logo, paleta de colores) aún no está definida y será proporcionada posteriormente. El sistema debe construirse con variables de diseño fácilmente reemplazables. El idioma de la interfaz es exclusivamente español. El presupuesto y el stack tecnológico no han sido confirmados; el ERS es tecnológicamente neutral.

#### **2.5 Suposiciones y Dependencias**

Se asume disponibilidad de hosting con soporte para sitios estáticos o framework moderno (Next.js, Astro, Nuxt o equivalente). Se asume que el cliente proporcionará textos, imágenes de productos y datos corporativos antes del inicio del desarrollo. El dominio y certificado SSL son responsabilidad del cliente.

---

### **3\. REQUISITOS DE INTERFAZ DE USUARIO**

#### **3.1 Estética y Diseño Visual**

La aplicación debe seguir un estilo moderno, limpio y minimalista con acentos de color que transmitan solidez industrial y confianza tecnológica. Los principios de diseño son: fondo predominantemente blanco o muy claro; tipografía sans-serif moderna y legible (Inter, Poppins o Manrope); acentos de color en uno o dos tonos (se sugiere azul acero o naranja industrial, por confirmar con branding); uso generoso del espacio en blanco para jerarquía visual; imágenes de alta calidad de los equipos con secciones hero impactantes; animaciones sutiles de scroll y transiciones no distractoras; e iconografía lineal moderna coherente en estilo.

#### **3.2 Diseño Responsivo**

El sitio debe ser completamente responsivo y funcionar correctamente en los siguientes puntos de quiebre: móvil de 320px a 767px, tablet de 768px a 1023px, escritorio desde 1024px en adelante, y pantallas grandes desde 1440px con contenido centrado y máximo ancho de 1280px.

#### **3.3 Navegación**

La barra de navegación debe ser fija (sticky) al hacer scroll. En móvil debe colapsar en un menú tipo hamburguesa. Los ítems del menú deben corresponder a las cinco páginas del sitio. El logo de la empresa debe estar visible en la barra y funcionar como enlace al inicio.

---

### **4\. REQUISITOS FUNCIONALES**

#### **4.1 Página 1 — Inicio (Home)**

**RF-01:** El sistema debe mostrar una sección hero de pantalla completa con un titular principal, un subtítulo descriptivo y al menos un botón CTA que dirija al catálogo o al formulario de contacto.

**RF-02:** El sistema debe mostrar una sección de propuesta de valor con tres a cuatro íconos o tarjetas que resalten ventajas competitivas de la empresa (garantía, soporte técnico, envío nacional, certificaciones).

**RF-03:** El sistema debe mostrar una sección de categorías de productos destacados con imágenes, nombre de categoría y enlace al catálogo. Las categorías mínimas son: maquinaria pesada (hornos, mezcladoras, extrusoras), equipos de refrigeración y conservación, y equipos generales de procesamiento.

**RF-04:** El sistema debe mostrar una sección de llamado a la acción secundario que invite al visitante a solicitar una cotización o contactar a la empresa.

**RF-05:** El sistema debe mostrar una sección de clientes o certificaciones (logos de marcas o certificados del sector) para generar confianza. Este contenido puede ser un placeholder en el MVP.

#### **4.2 Página 2 — Nosotros**

**RF-06:** El sistema debe mostrar la historia y misión de la empresa en formato de texto enriquecido con imágenes de apoyo.

**RF-07:** El sistema debe mostrar la misión, visión y valores de la empresa en un layout visual diferenciado.

**RF-08:** El sistema debe mostrar información del equipo de trabajo o fotografías institucionales. En el MVP puede ser una sección de texto con placeholder de imagen.

**RF-09:** El sistema debe mostrar indicadores numéricos relevantes (años de experiencia, equipos instalados, clientes atendidos, países de operación) en formato visual destacado.

#### **4.3 Página 3 — Catálogo de Productos**

**RF-10:** El sistema debe mostrar los productos organizados por categorías, navegables mediante filtros o secciones con ancla.

**RF-11:** Cada producto debe tener una tarjeta con: imagen del equipo, nombre del producto, descripción breve (máximo 3 líneas), categoría y botón de acción (solicitar información o ver detalle).

**RF-12:** El sistema debe permitir filtrar productos por categoría mediante botones o pestañas en la parte superior del catálogo.

**RF-13:** Al hacer clic en un producto, el sistema debe mostrar una vista de detalle con: imagen ampliada o galería, descripción técnica, características principales, ficha técnica básica (capacidad, dimensiones, voltaje, material) y formulario de solicitud de cotización o botón de contacto directo.

**RF-14:** El catálogo debe ser gestionable por el administrador en una fase posterior. En el MVP puede ser contenido estático en JSON o CMS sin cabeza (headless CMS).

#### **4.4 Página 4 — Servicios**

**RF-15:** El sistema debe mostrar los servicios complementarios que ofrece la empresa: instalación, mantenimiento preventivo y correctivo, capacitación de operadores, refacciones y garantía.

**RF-16:** Cada servicio debe presentarse con ícono representativo, nombre, descripción breve y botón de contacto.

**RF-17:** El sistema puede incluir un apartado de preguntas frecuentes (FAQ) relacionadas con los servicios o con la compra de equipos.

#### **4.5 Página 5 — Contacto**

**RF-18:** El sistema debe mostrar un formulario de contacto con los siguientes campos: nombre completo (obligatorio), empresa u organización (opcional), correo electrónico (obligatorio, con validación de formato), teléfono (opcional), tipo de consulta en lista desplegable (cotización, soporte técnico, información general, otro), mensaje (obligatorio, máximo 500 caracteres) y botón de envío.

**RF-19:** El formulario debe validar los campos obligatorios en el frontend antes de enviar, con mensajes de error claros en español junto a cada campo con problema.

**RF-20:** Al enviar exitosamente el formulario, el sistema debe mostrar un mensaje de confirmación visible y enviar los datos al correo corporativo de la empresa mediante un servicio de formulario (Formspree, EmailJS o backend propio).

**RF-21:** El sistema debe mostrar la información de contacto de la empresa: dirección física, teléfono, correo electrónico y horario de atención.

**RF-22:** El sistema debe mostrar un mapa embebido (Google Maps u OpenStreetMap) con la ubicación de la empresa.

**RF-23:** El sistema debe mostrar íconos con enlaces a las redes sociales activas de la empresa (WhatsApp, LinkedIn, Facebook, Instagram u otras que el cliente defina).

#### **4.6 Componentes Transversales**

**RF-24:** El sistema debe mostrar un footer en todas las páginas con: logo de la empresa, menú de navegación secundario, información de contacto resumida, íconos de redes sociales, año de copyright y aviso de privacidad.

**RF-25:** El sistema debe incluir un botón flotante de WhatsApp visible en todas las páginas para contacto directo, con número configurable.

**RF-26:** El sistema debe incluir un aviso de cookies básico conforme a regulaciones aplicables.

---

### **5\. REQUISITOS NO FUNCIONALES**

#### **5.1 Rendimiento**

**RNF-01:** El tiempo de carga inicial de la página de inicio debe ser menor a 3 segundos en conexión de banda ancha estándar (10 Mbps).

**RNF-02:** El puntaje de Google PageSpeed Insights debe ser igual o superior a 80 en dispositivos móviles y 90 en escritorio.

**RNF-03:** Las imágenes de productos deben servirse en formato WebP o AVIF con compresión optimizada. El tamaño máximo por imagen es de 200 KB.

**RNF-04:** El sitio debe implementar lazy loading para imágenes fuera del viewport inicial.

#### **5.2 Usabilidad**

**RNF-05:** El sitio debe cumplir con las pautas de accesibilidad WCAG 2.1 nivel AA como mínimo, incluyendo contraste de color adecuado, etiquetas alt en imágenes, navegación por teclado y compatibilidad con lectores de pantalla básicos.

**RNF-06:** La navegación completa del sitio no debe requerir más de 3 clics para llegar a cualquier sección o producto desde la página de inicio.

**RNF-07:** Los formularios deben incluir mensajes de error y éxito claros, en español y sin tecnicismos.

#### **5.3 Seguridad**

**RNF-08:** El sitio debe operar exclusivamente bajo protocolo HTTPS con certificado SSL/TLS válido.

**RNF-09:** El formulario de contacto debe implementar protección anti-spam mediante reCAPTCHA v3 o sistema equivalente.

**RNF-10:** No se deben almacenar datos personales en el frontend. Toda información enviada por formularios debe transmitirse directamente al correo corporativo o a un backend seguro.

#### **5.4 Compatibilidad**

**RNF-11:** El sitio debe ser compatible con las últimas dos versiones principales de Google Chrome, Mozilla Firefox, Safari (macOS e iOS) y Microsoft Edge.

**RNF-12:** El sitio debe funcionar correctamente en Windows, macOS, Android e iOS.

#### **5.5 SEO y Posicionamiento**

**RNF-13:** Cada página debe tener metaetiquetas únicas: title (máximo 60 caracteres), meta description (máximo 155 caracteres) y Open Graph para redes sociales.

**RNF-14:** El sitio debe generar automáticamente un sitemap.xml y un archivo robots.txt.

**RNF-15:** Las URLs deben ser amigables, descriptivas y en español (por ejemplo: /catalogo, /nosotros, /contacto).

**RNF-16:** El sitio debe implementar datos estructurados Schema.org para la empresa (LocalBusiness u Organization) y para los productos (Product).

#### **5.6 Mantenibilidad**

**RNF-17:** El código fuente debe estar documentado y organizado en componentes reutilizables. El sistema de diseño (colores, tipografías, espaciados) debe estar centralizado en variables o tokens de diseño para facilitar el cambio de identidad visual sin refactorizar el código.

**RNF-18:** El contenido del catálogo de productos debe poder actualizarse sin modificar código, ya sea mediante un archivo de datos (JSON/YAML) o un CMS sin cabeza de bajo costo como Sanity, Contentful o Strapi.

---

### **6\. RESTRICCIONES Y CONSIDERACIONES ADICIONALES**

#### **6.1 Restricciones de Diseño**

La identidad visual de la empresa (nombre definitivo, logotipo, paleta de colores y tipografía de marca) no ha sido definida al momento de este ERS. El desarrollo debe iniciar con un sistema de diseño provisional que pueda ser reemplazado de forma no destructiva una vez que el branding esté disponible. Se recomienda definir la identidad visual como primera actividad antes de iniciar el desarrollo de componentes UI.

#### **6.2 Restricciones Tecnológicas**

No existe un stack tecnológico obligatorio. Se recomienda evaluar las siguientes opciones según presupuesto y capacidad del equipo:

**Opción A — Bajo costo / Alto rendimiento:** Astro \+ Tailwind CSS \+ Sanity CMS. **Opción B — Ecosistema React:** Next.js \+ Tailwind CSS \+ Contentful o Sanity. **Opción C — Bajo mantenimiento:** Webflow o Framer con integración de formularios.

#### **6.3 Fases del Proyecto**

**Fase 1 — MVP (alcance de este ERS):** 5 páginas institucionales, catálogo estático, formulario de contacto funcional, diseño responsivo, SEO básico.

**Fase 2 — Mejoras:** Panel de administración para catálogo, módulo de cotizaciones en línea, blog o sección de noticias del sector, integración con CRM.

**Fase 3 — Expansión:** E-commerce con carrito de compras, portal de clientes, seguimiento de pedidos, soporte multiidioma.

#### **6.4 Entregables Esperados del Desarrollo**

Los entregables mínimos son: código fuente versionado en repositorio Git; diseño en Figma con componentes del sistema de diseño; documentación técnica de despliegue; manual básico de actualización de contenido para el equipo de la empresa; y sitio desplegado en ambiente de staging para revisión antes del lanzamiento.

---

### **7\. MAPA DE PÁGINAS Y COMPONENTES**

Sitio Web  
├── Página 1: Inicio  
│   ├── Hero (imagen, titular, CTA)  
│   ├── Propuesta de valor (íconos)  
│   ├── Categorías destacadas  
│   ├── CTA secundario  
│   └── Logos de confianza / certificaciones  
│  
├── Página 2: Nosotros  
│   ├── Historia de la empresa  
│   ├── Misión, Visión y Valores  
│   ├── Equipo / Fotografías  
│   └── Indicadores numéricos  
│  
├── Página 3: Catálogo  
│   ├── Filtros por categoría  
│   ├── Tarjetas de producto  
│   └── Vista de detalle  
│       ├── Galería de imágenes  
│       ├── Ficha técnica  
│       └── Formulario de cotización  
│  
├── Página 4: Servicios  
│   ├── Lista de servicios con íconos  
│   └── Preguntas frecuentes (FAQ)  
│  
├── Página 5: Contacto  
│   ├── Formulario de contacto  
│   ├── Información de la empresa  
│   ├── Mapa embebido  
│   └── Redes sociales  
│  
└── Componentes globales  
    ├── Barra de navegación (sticky)  
    ├── Footer  
    ├── Botón flotante WhatsApp  
    └── Banner de cookies

