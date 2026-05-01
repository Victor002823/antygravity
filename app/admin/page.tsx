'use client';

import { useState, useEffect } from 'react';

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null,
  });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // =========================
  // CARGAR PRODUCTOS
  // =========================
  const loadProducts = async () => {
    const res = await fetch('https://api.mudanzasellince.com/products.php');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =========================
  // CREATE PRODUCTO
  // =========================
  const handleSubmit = async () => {
    setLoading(true);

    try {
      // 1. subir imagen a R2
      const fd = new FormData();
      fd.append('file', form.image as File);

      const upload = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await upload.json();

      // 2. guardar en API PHP
      await fetch('https://api.mudanzasellince.com/create-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          description: form.description,
          image_url: uploadData.url,
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
  // DELETE PRODUCTO
  // =========================
  const deleteProduct = async (id: number) => {
    await fetch('https://api.mudanzasellince.com/delete-product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    await loadProducts();
  };

  // =========================
  // UPDATE PRODUCTO
  // =========================
  const updateProduct = async () => {
    await fetch('https://api.mudanzasellince.com/update-product.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });

    setEditing(null);
    await loadProducts();
  };

  return (
    <div style={{ padding: 30, maxWidth: 800 }}>

      <h1>Admin Panel</h1>

      {/* ================= CREATE FORM ================= */}
      <h2>Crear producto</h2>

      <input
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Categoría"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <textarea
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

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Guardando...' : 'Crear'}
      </button>

      {/* ================= EDIT FORM ================= */}
      {editing && (
        <div style={{ marginTop: 30, border: '1px solid blue', padding: 10 }}>
          <h2>Editar producto</h2>

          <input
            value={editing.name}
            onChange={(e) =>
              setEditing({ ...editing, name: e.target.value })
            }
          />

          <input
            value={editing.category}
            onChange={(e) =>
              setEditing({ ...editing, category: e.target.value })
            }
          />

          <textarea
            value={editing.description}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
          />

          <button onClick={updateProduct}>Guardar cambios</button>
        </div>
      )}

      {/* ================= LISTADO ================= */}
      <h2 style={{ marginTop: 40 }}>Productos</h2>

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.category}</p>
          <p>{p.description}</p>

          {p.image_url && (
            <img src={p.image_url} width="120" />
          )}

          <div style={{ marginTop: 10 }}>
            <button onClick={() => setEditing(p)}>
              Editar
            </button>

            <button
              onClick={() => deleteProduct(p.id)}
              style={{ marginLeft: 10 }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
