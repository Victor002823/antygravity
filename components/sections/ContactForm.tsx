'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  phone: z.string().optional(),
  type: z.enum(['cotizacion', 'soporte', 'informacion', 'otro'], {
    message: 'Selecciona un tipo de consulta'
  }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }).max(500, { message: 'El mensaje es demasiado largo (máx 500)' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'cotizacion'
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-display">Envíanos un Mensaje</h2>
      
      {isSuccess && (
        <div className="mb-6 bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg flex items-center gap-3">
          <CheckCircle2 size={20} />
          <p>¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors`}
              placeholder="Ej. Juan Pérez"
            />
            {errors.name && <p className="mt-1.5 text-sm text-error flex items-center gap-1"><AlertCircle size={14}/> {errors.name.message}</p>}
          </div>
          
          {/* Empresa */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Empresa (Opcional)</label>
            <input
              id="company"
              type="text"
              {...register('company')}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors"
              placeholder="Ej. Alimentos del Norte S.A."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors`}
              placeholder="juan@empresa.com"
            />
            {errors.email && <p className="mt-1.5 text-sm text-error flex items-center gap-1"><AlertCircle size={14}/> {errors.email.message}</p>}
          </div>
          
          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors"
              placeholder="+52 55 1234 5678"
            />
          </div>
        </div>

        {/* Tipo de Consulta */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Consulta *</label>
          <select
            id="type"
            {...register('type')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.type ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors bg-white`}
          >
            <option value="cotizacion">Cotización de Equipos</option>
            <option value="soporte">Soporte Técnico / Mantenimiento</option>
            <option value="informacion">Información General</option>
            <option value="otro">Otro</option>
          </select>
          {errors.type && <p className="mt-1.5 text-sm text-error flex items-center gap-1"><AlertCircle size={14}/> {errors.type.message}</p>}
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.message ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors resize-none`}
            placeholder="Por favor describe tu requerimiento detalladamente..."
          />
          {errors.message && <p className="mt-1.5 text-sm text-error flex items-center gap-1"><AlertCircle size={14}/> {errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3.5 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
            isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Enviando...' : (
            <>Enviar Mensaje <Send size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
}
