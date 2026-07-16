'use client';

import { useState } from 'react';

interface FormState {
  employeeCode: string;
  fullName: string;
  email: string;
}

const initialState: FormState = {
  employeeCode: '',
  fullName: '',
  email: ''
};

export function EmployeeForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { error?: string; fullName?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? 'No fue posible guardar el empleado.');
      }

      setMessage(`Empleado registrado: ${payload.fullName ?? form.fullName}`);
      setForm(initialState);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error inesperado');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <label>
        Codigo
        <input
          value={form.employeeCode}
          onChange={(event) => setForm({ ...form, employeeCode: event.target.value })}
          placeholder="EMP-001"
          required
        />
      </label>
      <label>
        Nombre completo
        <input
          value={form.fullName}
          onChange={(event) => setForm({ ...form, fullName: event.target.value })}
          placeholder="Nombre del empleado"
          required
        />
      </label>
      <label>
        Correo electronico
        <input
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          placeholder="correo@empresa.com"
          required
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Registrar empleado'}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
