import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mime from 'mime-types';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

const CATALOGO_JSON = path.join(__dirname, '..', 'catalogo_migsa', 'catalogo.json');
const IMAGENES_DIR = path.join(__dirname, '..', 'catalogo_migsa', 'imagenes');
const R2_PREFIX = 'catalogo-migsa';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

const REGLAS_CATEGORIA = [
  {
    categoria: 'refrigeracion',
    palabras: ['congelador', 'refrigerador', 'enfriador', 'nevera', 'vitrina',
               'exhibidor', 'mesa refrigerada', 'barra fria', 'ultracongelador',
               'abatidor', 'fabricadora de hielo', 'granita']
  },
  {
    categoria: 'empaque',
    palabras: ['empacadora', 'emplayadora', 'selladora', 'envasadora',
               'flejadora', 'etiquetadora']
  },
];
const CATEGORIA_DEFAULT = 'procesamiento';

function clasificar(titulo: string): string {
  const t = titulo.toLowerCase();
  for (const regla of REGLAS_CATEGORIA) {
    if (regla.palabras.some(p => t.includes(p))) return regla.categoria;
  }
  return CATEGORIA_DEFAULT;
}

async function subirImagenAR2(nombreArchivo: string): Promise<string | null> {
  const rutaLocal = path.join(IMAGENES_DIR, nombreArchivo);
  if (!fs.existsSync(rutaLocal)) return null;

  const key = `${R2_PREFIX}/${nombreArchivo}`;
  const body = fs.readFileSync(rutaLocal);
  const contentType = mime.lookup(nombreArchivo) || 'application/octet-stream';

  await r2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType as string,
  }));

  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

async function main() {
  const productos = JSON.parse(fs.readFileSync(CATALOGO_JSON, 'utf-8'));
  console.log(`Productos a importar: ${productos.length}`);

  let creados = 0, saltados = 0, errores = 0;
  const conteoCategorias: Record<string, number> = {};
  const sinClasificarClara: string[] = [];

  for (const p of productos) {
    try {
      if (!p.titulo || !p.archivo_imagen) { saltados++; continue; }

      const existente = await prisma.product.findFirst({ where: { name: p.titulo } });
      if (existente) { saltados++; continue; }

      const urlImagenR2 = await subirImagenAR2(p.archivo_imagen);
      if (!urlImagenR2) {
        console.warn(`  Sin imagen local para: ${p.titulo}`);
        saltados++;
        continue;
      }

      const categoria = clasificar(p.titulo);
      conteoCategorias[categoria] = (conteoCategorias[categoria] || 0) + 1;
      if (categoria === CATEGORIA_DEFAULT) sinClasificarClara.push(p.titulo);

      await prisma.product.create({
        data: {
          name: p.titulo,
          description: '',
          imageUrl: urlImagenR2,
          category: categoria,
          active: true,
        }
      });
      creados++;
      if (creados % 25 === 0) console.log(`  ${creados} creados...`);
    } catch (e: any) {
      console.error('Error con', p.titulo, e.message);
      errores++;
    }
  }

  console.log('\nListo.');
  console.log(`  Creados: ${creados}`);
  console.log(`  Saltados: ${saltados}`);
  console.log(`  Errores: ${errores}`);
  console.log('  Por categoria:', conteoCategorias);
  console.log(`\n  ${sinClasificarClara.length} cayeron en '${CATEGORIA_DEFAULT}' por defecto.`);
  console.log('  Muestra:', sinClasificarClara.slice(0, 10));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
