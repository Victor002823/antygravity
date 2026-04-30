"use client";

import { useState } from "react";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    desc: "",
    img: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Producto creado");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Productos</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} />
        <br />
        <input name="category" placeholder="Categoría" onChange={handleChange} />
        <br />
        <input name="desc" placeholder="Descripción" onChange={handleChange} />
        <br />
        <input name="img" placeholder="Imagen URL" onChange={handleChange} />
        <br />
        <button>Guardar</button>
      </form>
    </div>
  );
}
