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
  const [isSuccess, setIsSuccess] = useState(false);
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
      setIsSuccess(true);
      setForm(initialState);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error inesperado');
      setIsSuccess(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="role-name">Nombre del rol</label>
        <input
          id="role-name"
          className="form-input"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          placeholder="Administrador"
          required
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="spinner" />
              Guardando...
            </>
          ) : (
            'Registrar rol'
          )}
        </button>
      </div>
      {message && (
        <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
          <span className="toast-icon">{isSuccess ? '✓' : '✕'}</span>
          {message}
        </div>
      )}
    </form>
  );
}
