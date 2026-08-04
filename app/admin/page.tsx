'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Admin() {
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    imageUrl2: '',
  });

  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);

      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
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

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) =>
      p.name?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    );
  }, [products, search]);

  const uploadFile = async (file: File): Promise<string | null> => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.success) return data.url;
    alert('Error al subir imagen: ' + data.error);
    return null;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    if (url) setForm((prev) => ({ ...prev, imageUrl: url }));
    setUploading(false);
  };

  const handleImageUpload2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading2(true);
    const url = await uploadFile(file);
    if (url) setForm((prev) => ({ ...prev, imageUrl2: url }));
    setUploading2(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const isEditing = !!editing;

      const res = await fetch('/api/products', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(isEditing ? { ...form, id: editing.id } : form),
      });

      const data = await res.json();

      if (data.success) {
        loadProducts();
        setForm({ name: '', category: '', description: '', imageUrl: '', imageUrl2: '' });
        setEditing(null);
        alert(isEditing ? 'Producto actualizado' : 'Producto creado');
      } else {
        alert('Error al guardar: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este equipo?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        loadProducts();
      } else {
        alert('Error al borrar: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product: any) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description || product.desc || '',
      imageUrl: product.imageUrl || product.img || '',
      imageUrl2: product.imageUrl2 || '',
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

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Imagen principal</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
              />
              {uploading && <p className="text-sm text-primary mt-2">Subiendo imagen...</p>}
              {form.imageUrl && !uploading && (
                <div className="mt-3 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <img src={form.imageUrl} alt="Vista previa" className="w-full h-full object-contain p-1" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Segunda imagen (opcional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload2}
                disabled={uploading2}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
              />
              {uploading2 && <p className="text-sm text-primary mt-2">Subiendo imagen...</p>}
              {form.imageUrl2 && !uploading2 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    <img src={form.imageUrl2} alt="Vista previa 2" className="w-full h-full object-contain p-1" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, imageUrl2: '' }))}
                    className="text-xs text-error hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={uploading || uploading2 || !form.imageUrl}
                className="flex-1 bg-primary text-white p-3 rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editing ? 'Guardar Cambios' : 'Agregar Equipo'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => { setEditing(null); setForm({ name: '', category: '', description: '', imageUrl: '', imageUrl2: '' }); }}
                  className="bg-gray-200 text-gray-700 p-3 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, categoría o descripción..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm outline-none focus:border-primary transition-colors"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product) => (
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
                      {product.imageUrl2 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded">
                          2 fotos
                        </span>
                      )}
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

              {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">
                    {search ? `No hay resultados para "${search}".` : 'No hay productos registrados en el sistema.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
