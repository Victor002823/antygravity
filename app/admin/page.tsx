'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null,
  });

  const [editing, setEditing] = useState<any | null>(null);

  // =========================
  // 🔐 AUTH CHECK
  // =========================
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!document.cookie.includes('token')) {
        router.push('/login');
      }
    }
  }, []);

  // =========================
  // 📦 LOAD PRODUCTS (SAFE)
  // =========================
  const loadProducts = async () => {
    try {
      const res = await fetch('https://api.mudanzasellince.com/products.php', {
        credentials: 'include',
      });

      const data = await res.json();

      // 🔥 VALIDACIÓN ROBUSTA
      if (data?.data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error('API ERROR:', data);
        setProducts([]);
      }
    } catch (err) {
      console.error('FETCH ERROR:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // ➕ CREATE PRODUCT
  // =========================
  const createProduct = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('file', form.image as File);

      const upload = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await upload.json();

      await fetch('https://api.mudanzasellince.com/create-product.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          description: form.description,
          image: uploadData.url,
        }),
      });

      setForm({ name: '', category: '', description: '', image: null });
      await loadProducts();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // =========================
  // 🗑 DELETE
  // =========================
  const deleteProduct = async (id: number) => {
    await fetch('https://api.mudanzasellince.com/delete-product.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    await loadProducts();
  };

  // =========================
  // ✏️ UPDATE
  // =========================
  const updateProduct = async () => {
    await fetch('https://api.mudanzasellince.com/update-product.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    await loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-xl font-bold mb-6">⚡ Admin Panel</h1>

        <nav className="space-y-3 text-gray-600">
          <p className="font-semibold text-black">📦 Productos</p>
          <p>➕ Crear</p>
          <p>📊 Dashboard</p>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Productos</h2>

          <button
            onClick={loadProducts}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Recargar
          </button>
        </div>

        {/* ================= CREATE CARD ================= */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="font-bold mb-4">Crear producto</h3>

          <div className="grid gap-3">

            <input
              className="border p-2 rounded"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Categoría"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <textarea
              className="border p-2 rounded"
              placeholder="Descripción"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
            />

            <button
              onClick={createProduct}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              {loading ? 'Creando...' : 'Crear producto'}
            </button>

          </div>
        </div>

        {/* ================= EDIT ================= */}
        {editing && (
          <div className="bg-white p-6 rounded-xl shadow mb-8 border border-blue-500">
            <h3 className="font-bold mb-4">Editar producto</h3>

            <input
              className="border p-2 rounded w-full mb-2"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <input
              className="border p-2 rounded w-full mb-2"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            />

            <textarea
              className="border p-2 rounded w-full mb-2"
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={updateProduct}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Guardar
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Array.isArray(products) && products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              {p.image && (
                <img
                  src={p.image}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4">

                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.category}</p>

                <p className="text-sm mt-2 text-gray-700">
                  {p.description}
                </p>

                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => setEditing(p)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Eliminar
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* ================= EMPTY STATE ================= */}
        {!products.length && (
          <div className="text-center text-gray-500 mt-10">
            No hay productos o no hay sesión activa
          </div>
        )}

      </main>
    </div>
  );
}
