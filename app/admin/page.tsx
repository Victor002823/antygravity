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
    // Si usas un input file, mantenemos image, si es URL, usa string
    imageUrl: '',
  });

  const [editing, setEditing] = useState<any | null>(null);

  // 🔐 AUTH SAFE
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  // 📦 LEER PRODUCTOS (GET)
  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);

      const res = await fetch('/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        console.error('Fetch error:', data);
        setProducts([]);
      } else {
        setProducts(data.data ?? []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Connection error:', err);
      setProducts([]);
      setLoading(false);
    }
  };

  // ➕/✏️ CREAR O EDITAR PRODUCTO (POST / PUT)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const isEditing = !!editing;

      // Si estas usando '/api/create-product' puedes cambiar la URL aquí para el POST
      const url = isEditing ? '/api/products' : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(isEditing ? { ...form, id: editing.id } : form),
      });

      const data = await res.json();

      if (data.success) {
        loadProducts(); // Recargar la lista
        setForm({ name: '', category: '', description: '', imageUrl: '' }); // Limpiar
        setEditing(null);
        alert(isEditing ? 'Producto actualizado' : 'Producto creado');
      } else {
        alert('Error al guardar: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // 🗑️ BORRAR PRODUCTO (DELETE)
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este equipo?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        loadProducts(); // Recargar lista tras borrar
      } else {
        alert('Error al borrar: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Cargar info en el formulario para editar
  const handleEditClick = (product: any) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description || product.desc || '',
      imageUrl: product.imageUrl || product.img || '',
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 font-display">Panel de Control</h1>
          <p className="text-gray-500 mt-2">Gestiona el catálogo de equipos industriales Antigravity.</p>
        </div>
        <button
          onClick={loadProducts}
          className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg"
        >
          Refrescar Datos
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6">{editing ? 'Editar Equipo' : 'Nuevo Equipo'}</h2>
          <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre del equipo"
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <select
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-primary bg-white"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Selecciona Categoría</option>
              <option value="procesamiento">Procesamiento</option>
              <option value="refrigeracion">Refrigeración</option>
              <option value="empaque">Empaque</option>
            </select>
            <textarea
              placeholder="Descripción"
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-primary min-h-[100px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            {/* Por ahora un campo de texto para la URL de la imagen. Si usas subida de archivos, se cambia a input type="file" */}
            <input
              type="text"
              placeholder="URL de la imagen (/images/products/...)"
              className="p-3 border border-gray-200 rounded-lg outline-none focus:border-primary"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white p-3 rounded-lg font-bold hover:bg-primary/90 transition"
              >
                {editing ? 'Guardar Cambios' : 'Agregar Equipo'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => { setEditing(null); setForm({ name: '', category: '', description: '', imageUrl: '' }); }}
                  className="bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Productos */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={product.imageUrl || product.img}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-1">{product.description || product.desc}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-lg hover:bg-primary/10"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-gray-400 hover:text-error transition-colors bg-gray-50 rounded-lg hover:bg-error/10"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">No hay productos registrados en el sistema.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
