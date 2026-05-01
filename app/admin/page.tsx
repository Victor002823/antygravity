'use client';

import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!form.image) return alert('Selecciona una imagen');

    setLoading(true);

    try {
      // 1️⃣ Subir imagen a R2
      const fd = new FormData();
      fd.append('file', form.image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error('Error subiendo imagen');
      }

      // 2️⃣ Guardar producto en MySQL
      const saveRes = await fetch('https://api.mudanzasellince.com/create-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          description: form.description,
          image_url: uploadData.url,
        }),
      });

      const saveData = await saveRes.json();

      if (saveData.success) {
        alert('Producto guardado 🚀');
        setForm({ name: '', category: '', description: '', image: null });
      } else {
        throw new Error(saveData.error);
      }

    } catch (err) {
      console.error(err);
      alert('Error en el proceso');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Panel Admin</h1>

      <input
        name="name"
        placeholder="Nombre"
        className="border p-2 w-full mb-4"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Categoría"
        className="border p-2 w-full mb-4"
        value={form.category}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        className="border p-2 w-full mb-4"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="file"
        name="image"
        className="mb-4"
        onChange={handleChange}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading ? 'Guardando...' : 'Guardar Producto'}
      </button>
    </div>
  );
}
