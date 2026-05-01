'use client';

import { useState, ChangeEvent } from 'react';

export default function Admin() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    // ✅ Validación
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
      console.log('FORM DATA:', form);

      // 🔥 1. Subir imagen a R2
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

      // 🔥 2. Guardar en MySQL (PHP API)
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

      if (!saveData.success) {
        throw new Error(saveData.error || 'Error guardando');
      }

      alert('Producto guardado 🚀');

      // 🔄 Reset form
      setForm({
        name: '',
        category: '',
        description: '',
        image: null,
      });

    } catch (err) {
      console.error(err);
      alert('Error en el proceso');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 500 }}>
      <h1>Panel Admin</h1>

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
    </div>
  );
}
