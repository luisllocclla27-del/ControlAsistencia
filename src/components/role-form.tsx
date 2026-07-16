'use client';

import { useState } from 'react';

interface FormState {
  name: string;
}

const initialState: FormState = {
  name: ''
};

export function RoleForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { error?: string; name?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? 'No fue posible guardar el rol.');
      }

      setMessage(`Rol registrado: ${payload.name ?? form.name}`);
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
        Nombre del rol
        <input
          value={form.name}
          onChange={(event) => setForm({ name: event.target.value })}
          placeholder="Administrador"
          required
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Registrar rol'}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
