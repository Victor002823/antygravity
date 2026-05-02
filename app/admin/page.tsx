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
  // 🔐 AUTH CHECK (SAFE)
  // =========================
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
      }
    }
  }, []);

  // =========================
  // 📦 LOAD PRODUCTS (FIXED AUTH)
  // =========================
  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://api.mudanzasellince.com/products.php', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

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

      const token = localStorage.getItem('token');

      await fetch('https://api.mudanzasellince.com/create-product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
    const token = localStorage.getItem('token');

    await fetch('https://api.mudanzasellince.com/delete-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    await loadProducts();
  };

  // =========================
  // ✏️ UPDATE
  // =========================
  const updateProduct = async () => {
    const token = localStorage.getItem('token');

    await fetch('https://api.mudanzasellince.com/update-product.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    await loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-xl font-bold mb-6">⚡ Admin Panel</h1>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        <button
          onClick={loadProducts}
          className="px-4 py-2 bg-black text-white rounded-lg mb-6"
        >
          Recargar
        </button>

        {/* CREATE */}
        <div className="bg-white p-4 rounded shadow mb-6">

          <input
            className="border p-2 w-full mb-2"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 w-full mb-2"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <textarea
            className="border p-2 w-full mb-2"
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
            className="bg-blue-600 text-white px-4 py-2 mt-2"
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
        </div>

        {/* LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {Array.isArray(products) && products.map((p) => (
            <div key={p.id} className="bg-white p-4 shadow rounded">

              {p.image && (
                <img src={p.image} className="h-32 w-full object-cover mb-2" />
              )}

              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-sm">{p.description}</p>

              <div className="flex gap-2 mt-2">

                <button
                  onClick={() => setEditing(p)}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

        </div>

      </main>
    </div>
  );
}
