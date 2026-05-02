---
trigger: always_on
---

# ANTIGRAVITY — Guía de Desarrollo Profesional
### App Web Corporativa · Equipos Industriales para Procesamiento de Alimentos
> **Versión:** 1.0 · **Fecha:** Abril 2026 · **Clasificación:** Interno / Equipo de Desarrollo

---

## Índice

1. [Filosofía del Proyecto](#1-filosofía-del-proyecto)
2. [Identidad Visual y Design System](#2-identidad-visual-y-design-system)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Convenciones de Código](#4-convenciones-de-código)
5. [Componentes y UI](#5-componentes-y-ui)
6. [Rendimiento y Optimización](#6-rendimiento-y-optimización)
7. [SEO y Accesibilidad](#7-seo-y-accesibilidad)
8. [Seguridad](#8-seguridad)
9. [Gestión de Contenido](#9-gestión-de-contenido)
10. [Control de Versiones y Git](#10-control-de-versiones-y-git)
11. [Testing y QA](#11-testing-y-qa)
12. [Despliegue y Entornos](#12-despliegue-y-entornos)
13. [Comunicación y Flujo de Trabajo](#13-comunicación-y-flujo-de-trabajo)

---

## 1. Filosofía del Proyecto

### 1.1 Principios Rectores

**ANTIGRAVITY** es la plataforma digital de una empresa líder en comercialización de maquinaria y equipos industriales para procesamiento de alimentos. Todo el trabajo del equipo de desarrollo debe estar guiado por estos principios:

| Principio | Descripción |
|-----------|-------------|
| **Claridad sobre complejidad** | Código simple, legible y mantenible siempre por encima de soluciones ingeniosas pero difíciles de entender. |
| **El cliente primero** | Cada decisión técnica debe traducirse en una mejor experiencia para el usuario final. |
| **Rendimiento como feature** | La velocidad no es opcional; es parte del producto. |
| **Consistencia total** | Un componente, un estilo, una convención. Sin excepciones. |
| **Documentar mientras se construye** | El código sin documentación no está terminado. |

### 1.2 Público Objetivo

El sitio está dirigido a adultos de 25 a 60 años, tomadores de decisiones en empresas del sector alimentario (PYMES, emprendedores, gerentes de producción). El tono visual y comunicacional debe transmitir:

- **Confianza y solidez** — empresa con experiencia y respaldo técnico
- **Modernidad** — tecnología de punta, no maquinaria antigua
- **Claridad** — el usuario debe encontrar lo que busca en máximo 3 clics

### 1.3 Stack Tecnológico Oficial

```
Frontend:     Next.js 14 (App Router) + TypeScript
Estilos:      Tailwind CSS v3
Animaciones:  Framer Motion
Íconos:       Lucide React
Formularios:  React Hook Form + Zod
Mapas:        Google Maps API
Deploy:       Vercel
CDN/DNS:      Cloudflare
Analítica:    Google Analytics 4
Repo:         GitHub (rama principal: main)
```

---

## 2. Identidad Visual y Design System

### 2.1 Paleta de Colores

#### Colores Primarios

| Token | Nombre | HEX | Uso |
|-------|--------|-----|-----|
| `--color-primary` | Azul Antigravity | `#0066FF` | CTAs, links activos, acentos principales |
| `--color-secondary` | Cian Técnico | `#00C2FF` | Gradientes, highlights, hover states |
| `--color-dark` | Negro Carbón | `#0D0D0D` | Fondos hero, texto display grande |
| `--color-white` | Blanco Puro | `#FFFFFF` | Fondos principales, texto sobre oscuro |

#### Colores Neutros

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-gray-100` | `#F4F6FA` | Fondos de secciones alternas |
| `--color-gray-200` | `#E0E6EF` | Bordes, divisores |
| `--color-gray-400` | `#8A9BB5` | Texto secundario, placeholders |
| `--color-gray-800` | `#2B2D42` | Cuerpo de texto principal |

#### Colores de Estado

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-success` | `#00C48C` | Confirmaciones, mensajes de éxito |
| `--color-error` | `#FF3B5C` | Errores de validación, alertas críticas |
| `--color-warning` | `#FF8C00` | Advertencias, avisos de stock |
| `--color-info` | `#0066FF` | Información neutral, tooltips |

> **⚠ Regla de contraste:** Todo texto sobre fondo de color debe cumplir ratio mínimo **4.5:1** (WCAG 2.1 AA). Verificar siempre en [contrast.tools](https://contrast.tools).

### 2.2 Tipografía

```
Tipografía principal:   Inter (Google Fonts)
Tipografía alternativa: Plus Jakarta Sans
Tipografía monospace:   JetBrains Mono (solo para código/specs técnicas)
```

#### Escala Tipográfica

| Nivel | Clase Tailwind | Tamaño | Peso | Uso |
|-------|---------------|--------|------|-----|
| Display | `text-6xl` | 60px | 800 | Hero headlines |
| H1 | `text-5xl` | 48px | 700 | Títulos de página |
| H2 | `text-3xl` | 30px | 700 | Títulos de sección |
| H3 | `text-2xl` | 24px | 600 | Subtítulos |
| Body L | `text-lg` | 18px | 400 | Párrafos principales |
| Body | `text-base` | 16px | 400 | Texto general |
| Small | `text-sm` | 14px | 400 | Etiquetas, captions |
| XSmall | `text-xs` | 12px | 500 | Badges, tags |

#### Reglas de Tipografía

- **Un solo H1 por página.** Sin excepciones.
- El interlineado mínimo para cuerpo de texto es `leading-relaxed` (1.625).
- No usar fuentes decorativas ni más de 2 familias tipográficas en el sitio.
- El tamaño mínimo de texto legible es **14px** (nunca menor en producción).

### 2.3 Espaciado

Antigravity usa el sistema de espaciado de Tailwind (base 4px). Las unidades aprobadas son:

```
xs:  4px   (p-1, m-1)
sm:  8px   (p-2, m-2)
md:  16px  (p-4, m-4)
lg:  24px  (p-6, m-6)
xl:  32px  (p-8, m-8)
2xl: 48px  (p-12, m-12)
3xl: 64px  (p-16, m-16)
4xl: 96px  (p-24, m-24)
```

> **Regla:** El padding interno de secciones en desktop es mínimo `py-16 px-8`. En mobile, mínimo `py-12 px-4`.

### 2.4 Bordes y Radios

```
Sin radio:       rounded-none  → Tablas de datos, elementos técnicos
Radio pequeño:   rounded-md    → Inputs, badges, chips
Radio medio:     rounded-xl    → Cards de productos
Radio grande:    rounded-2xl   → Modals, panels
Radio completo:  rounded-full  → Avatares, botones pill, iconos circulares
```

### 2.5 Sombras

```css
/* Sombra estándar para cards */
shadow-sm   → Hover ligero
shadow-md   → Cards en reposo
shadow-lg   → Cards en hover, dropdowns
shadow-xl   → Modals, overlays
```

---

## 3. Arquitectura del Proyecto

### 3.1 Estructura de Carpetas

```
antigravity/
├── app/                        # Next.js App Router
│   ├── (site)/                 # Grupo de rutas del sitio público
│   │   ├── page.tsx            # Home
│   │   ├── catalogo/
│   │   │   ├── page.tsx        # Catálogo general
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Detalle de producto
│   │   ├── nosotros/
│   │   │   └── page.tsx
│   │   ├── servicios/
│   │   │   └── page.tsx
│   │   └── contacto/
│   │       └── page.tsx
│   ├── api/                    # API Routes (serverless)
│   │   └── contacto/
│   │       └── route.ts        # Endpoint del formulario
│   ├── layout.tsx              # Root layout
│   ├── not-found.tsx           # Página 404
│   └── globals.css             # Estilos globales + variables CSS
│
├── components/                 # Todos los componentes React
│   ├── ui/                     # Componentes primitivos reutilizables
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts            # Barrel export
│   ├── layout/                 # Componentes de estructura
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/               # Secciones de página
│   │   ├── HeroBanner.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ContactForm.tsx
│   │   └── TestimonialsCarousel.tsx
│   └── seo/                    # Componentes de metadatos
│       └── PageMeta.tsx
│
├── content/                    # Datos estáticos del sitio
│   ├── products.ts             # Catálogo de productos
│   ├── services.ts             # Lista de servicios
│   ├── team.ts                 # Equipo
│   └── config.ts               # Config global (nombre, contacto, redes)
│
├── lib/                        # Utilidades y helpers
│   ├── utils.ts                # Helpers genéricos
│   ├── validations.ts          # Esquemas Zod
│   ├── email.ts                # Lógica de envío de email
│   └── analytics.ts            # Helpers de GA4
│
├── hooks/                      # Custom hooks
│   ├── useScrollPosition.ts
│   ├── useMediaQuery.ts
│   └── useContactForm.ts
│
├── types/                      # Tipos TypeScript globales
│   ├── product.ts
│   ├── service.ts
│   └── common.ts
│
├── public/                     # Archivos estáticos
│   ├── images/
│   │   ├── products/           # Fotos de equipos (WebP)
│   │   ├── team/               # Fotos del equipo
│   │   └── og/                 # Imágenes Open Graph
│   ├── icons/                  # SVGs de íconos
│   ├── favicon.ico
│   └── robots.txt
│
├── styles/                     # Estilos adicionales si se necesitan
│   └── animations.css
│
├── .env.local                  # Variables de entorno locales (NO commitear)
├── .env.example                # Plantilla de variables (SÍ commitear)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### 3.2 Convenciones de Nombrado de Archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `ProductCard.tsx` |
| Páginas (App Router) | lowercase | `page.tsx`, `layout.tsx` |
| Hooks | camelCase con `use` | `useScrollPosition.ts` |
| Utilidades / helpers | camelCase | `formatPrice.ts` |
| Tipos TypeScript | PascalCase | `ProductType.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_PRODUCTS_PER_PAGE` |
| Imágenes | kebab-case | `horno-rotatorio-500l.webp` |
| Variables CSS | kebab-case con prefijo `--` | `--color-primary` |

---

## 4. Convenciones de Código

### 4.1 TypeScript

**Regla fundamental:** TypeScript estricto activado. Sin `any`. Sin `@ts-ignore` sin justificación documentada.

```typescript
// ✔ CORRECTO — tipos explícitos
interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  specs: ProductSpec[];
  imageUrl: string;
  isAvailable: boolean;
}

// ✖ INCORRECTO — evitar
const product: any = fetchProduct();
const data = {} as Product; // Solo si es absolutamente necesario
```

**Tipos vs Interfaces:**
- Usar `interface` para objetos y contratos de componentes (props)
- Usar `type` para uniones, intersecciones y alias simples

```typescript
// Interface para props de componente
interface ProductCardProps {
  product: Product;
  onRequestQuote: (id: string) => void;
  className?: string;
}

// Type para uniones
type ProductCategory = "maquinaria-pesada" | "procesamiento" | "refrigeracion";
```

### 4.2 Componentes React

Todo componente debe seguir esta estructura estándar:

```typescript
// components/sections/ProductCard.tsx

import { type FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import type { Product } from "@/types/product";

// 1. Definición de Props con interface
interface ProductCardProps {
  product: Product;
  onRequestQuote: (id: string) => void;
  className?: string;
}

// 2. Componente como función nombrada (no arrow function anónima)
const ProductCard: FC<ProductCardProps> = ({ product, onRequestQuote, className }) => {
  // 3. Hooks al inicio
  // 4. Handlers con nombre descriptivo
  const handleQuoteRequest = () => {
    onRequestQuote(product.id);
  };

  // 5. Return con JSX limpio
  return (
    <article className={`rounded-xl shadow-md bg-white ${className ?? ""}`}>
      <Image
        src={product.imageUrl}
        alt={`Equipo ${product.name} - ${product.category}`}
        width={400}
        height={300}
        className="w-full object-cover rounded-t-xl"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 mt-2 text-sm">{product.shortDescription}</p>
        <Button onClick={handleQuoteRequest} className="mt-4 w-full">
          Solicitar información
        </Button>
      </div>
    </article>
  );
};