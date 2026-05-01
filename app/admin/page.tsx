'use client';

import { useState, useEffect, ChangeEvent } from 'react';

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null,
  });

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Cargar productos
  const loadProducts = async () => {
    try {
      const res = await fetch('https://api.mudanzasellince.com/products.php');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔧 Manejo de inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'image') {
      const fileInput = e.target as HTMLInputElement;
      setForm({ ...form, image: fileInput.files?.[0] || null });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // 🚀 Guardar producto
  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.description) {
      alert('Llena todos los campos');
      return;
    }

    if (!form.image) {
      alert('Selecciona una imagen');
      return;
    }

    setLoading(true);

    try {
      console.log('FORM:', form);

      // 1. Subir imagen a R2
      const fd = new FormData();
      fd.append('file', form.image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await uploadRes.json();
      console.log('UPLOAD:', uploadData);

      if (!uploadRes.ok || !uploadData.success) {
        throw new Error('Error subiendo imagen');
      }

      // 2. Guardar en PHP API
      const saveRes = await fetch(
        'https://api.mudanzasellince.com/create-product.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            category: form.category,
            description: form.description,
            image_url: uploadData.url,
          }),
        }
      );

      const saveData = await saveRes.json();
      console.log('SAVE:', saveData);

      if (!saveRes.ok || !saveData.success) {
        throw new Error('Error guardando en DB');
      }

      alert('Producto guardado 🚀');

      // 🔄 Reset form
      setForm({
        name: '',
        category: '',
        description: '',
        image: null,
      });

      // 🔥 Recargar productos
      await loadProducts();

    } catch (err: any) {
      console.error('ERROR:', err);
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 600 }}>
      <h1>Panel Admin</h1>

      {/* FORM */}
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <input
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        style={{ width: '100%', marginBottom: 10 }}
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        style={{ marginBottom: 20 }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>

      {/* LISTADO */}
      <h2 style={{ marginTop: 40 }}>Productos</h2>

      {products.length === 0 && <p>No hay productos aún</p>}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p><b>Categoría:</b> {p.category}</p>
          <p>{p.description}</p>

          {p.image_url && (
            <img
              src={p.image_url}
              width="120"
              style={{ marginTop: 10 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
