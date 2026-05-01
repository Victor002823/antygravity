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
    if (!form.image) return alert('Selecciona una imagen');

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('file', form.image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) throw new Error('Upload failed');

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

      if (!saveData.success) throw new Error('DB error');

      alert('Producto guardado 🚀');

    } catch (err) {
      console.error(err);
      alert('Error');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Panel Admin</h1>

      <input name="name" placeholder="Nombre" onChange={handleChange} />
      <br /><br />

      <input name="category" placeholder="Categoría" onChange={handleChange} />
      <br /><br />

      <textarea name="description" placeholder="Descripción" onChange={handleChange}></textarea>
      <br /><br />

      <input type="file" name="image" onChange={handleChange} />
      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}
