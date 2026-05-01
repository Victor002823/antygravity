import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// 📥 GET → obtener productos
export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM products ORDER BY id DESC");

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
  }
}


// 📤 POST → crear producto
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, category, description, image } = body;

    if (!name || !image) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    await db.execute(
      "INSERT INTO products (name, category, description, image) VALUES (?, ?, ?, ?)",
      [name, category, description, image]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "CREATE_FAILED" }, { status: 500 });
  }
}
