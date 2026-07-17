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
  const [isSuccess, setIsSuccess] = useState(false);
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
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="emp-code">Código</label>
          <input
            id="emp-code"
            className="form-input"
            value={form.employeeCode}
            onChange={(e) => setForm({ ...form, employeeCode: e.target.value })}
            placeholder="EMP-001"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="emp-name">Nombre completo</label>
          <input
            id="emp-name"
            className="form-input"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Nombre del empleado"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="emp-email">Correo electrónico</label>
        <input
          id="emp-email"
          className="form-input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="correo@empresa.com"
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
            'Registrar empleado'
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
