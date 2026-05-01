'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    const res = await fetch('https://api.mudanzasellince.com/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('admin', JSON.stringify(data.user));
      router.push('/admin');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Login Admin</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>
        Entrar
      </button>
    </div>
  );
}
