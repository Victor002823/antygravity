import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No se envió ningún archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop() || 'jpg';
    const key = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
      })
    );

    const url = `${process.env.R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('R2 upload error:', error);
    return NextResponse.json({ success: false, error: 'Error al subir la imagen' }, { status: 500 });
  }
}
