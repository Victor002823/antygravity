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
  // 🔐 AUTH CHECK SAFE
  // =========================
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) router.push('/login');
    }
  }, []);

  // =========================
  // 📦 LOAD PRODUCTS SAFE
  // =========================
  const loadProducts = async () => {
    try {
      const res = await fetch('https://api.mudanzasellince.com/products.php');
      const data = await res.json();

      if (!data?.success || !Array.isArray(data.data)) {
        setProducts([]);
        console.warn('API inválida:', data);
        return;
      }

      setProducts(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // ➕ CREATE PRODUCT SAFE
  // =========================
  const createProduct = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      if (form.image) fd.append('file', form.image);

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
          image: uploadData?.url || '',
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
  // 🗑 DELETE SAFE
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
  // ✏️ UPDATE SAFE
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

  // =========================
  // 🧠 CRASH PROTECTION
  // =========================
  if (!Array.isArray(products)) {
    return <div className="p-10">Cargando dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-xl font-bold mb-6">Admin</h1>
        <p>Productos</p>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-4">Productos</h2>

        {/* CREATE */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <input
            placeholder="Nombre"
            className="border p-2 w-full mb-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <button
            onClick={createProduct}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
        </div>

        {/* LIST */}
        <div className="grid gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow">

              <h3 className="font-bold">{p.name}</h3>
              <p>{p.category}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditing(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
