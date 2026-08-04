import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

const BASE_URL = 'https://migsa.online';
const CATALOGO_JSON = path.join(__dirname, '..', 'catalogo_migsa', 'catalogo.json');

function limpiarHtml(html) {
  if (!html) return '';
  let texto = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return texto;
}

function eliminarTextoEnvio(texto) {
  if (!texto) return texto;
  const patron = /env[ií]o\s+sin\s+costo\s+en\s+ciudades\s+de\s+guadalajara,?\s+monterrey\s+y\s+cdmx,?\s+por\s+cobrar\s+a\s+cualquier\s+otra\s+parte\s+de\s+la\s+rep[uú]blica\s+mexicana\.?/gi;
  return texto
    .replace(patron, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function obtenerTodosLosProductosMigsa() {
  const productos = [];
  let page = 1;
  while (true) {
    console.log(`Descargando pagina ${page} de Migsa...`);
    const resp = await fetch(`${BASE_URL}/products.json?limit=250&page=${page}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; actualizador-descripciones/1.0)' }
    });
    const data = await resp.json();
    const lote = data.products || [];
    if (lote.length === 0) break;
    productos.push(...lote);
    page++;
    await new Promise(r => setTimeout(r, 500));
  }
  return productos;
}

async function main() {
  const catalogoLocal = JSON.parse(fs.readFileSync(CATALOGO_JSON, 'utf-8'));
  const handlesImportados = new Set(catalogoLocal.map((p) => p.handle));
  const handleATitulo = new Map(catalogoLocal.map((p) => [p.handle, p.titulo]));

  const productosMigsa = await obtenerTodosLosProductosMigsa();
  console.log(`Total productos en Migsa: ${productosMigsa.length}`);

  let actualizados = 0, sinCambios = 0, noEncontrados = 0, errores = 0;

  for (const p of productosMigsa) {
    if (!handlesImportados.has(p.handle)) continue;

    const titulo = handleATitulo.get(p.handle);
    let descripcion = limpiarHtml(p.body_html || '');
    descripcion = eliminarTextoEnvio(descripcion);
    if (!descripcion) { sinCambios++; continue; }

    try {
      const resultado = await prisma.product.updateMany({
        where: { name: titulo },
        data: { description: descripcion },
      });
      if (resultado.count > 0) {
        actualizados++;
        if (actualizados % 25 === 0) console.log(`  ${actualizados} actualizados...`);
      } else {
        noEncontrados++;
        console.warn(`  No encontrado en BD: ${titulo}`);
      }
    } catch (e) {
      console.error('Error con', titulo, e.message);
      errores++;
    }
  }

  console.log('\nListo.');
  console.log(`  Actualizados: ${actualizados}`);
  console.log(`  Sin descripcion en Migsa: ${sinCambios}`);
  console.log(`  No encontrados en BD: ${noEncontrados}`);
  console.log(`  Errores: ${errores}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
