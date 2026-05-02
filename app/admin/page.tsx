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

  // 🔐 AUTH SAFE
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);

  // 📦 LOAD PRODUCTS SAFE
  const loadProducts = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://api.mudanzasellince.com/products.php', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.log(await res.text());
        setProducts([]);
        return;
      }

      const data = await res.json();
      setProducts(data?.data ?? []);
    } catch (err) {
      console.error(err);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin</h1>
    </div>
  );
}
