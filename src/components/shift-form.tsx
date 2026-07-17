'use client';

import { useState } from 'react';

interface FormState {
  name: string;
  startTime: string;
  endTime: string;
  toleranceMinutes: string;
}

const initialState: FormState = {
  name: '',
  startTime: '08:00',
  endTime: '17:00',
  toleranceMinutes: '10'
};

export function ShiftForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/shifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          startTime: form.startTime,
          endTime: form.endTime,
          toleranceMinutes: Number(form.toleranceMinutes)
        })
      });

      const payload = (await response.json()) as { error?: string; name?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? 'No fue posible guardar el turno.');
      }

      setMessage(`Turno registrado: ${payload.name ?? form.name}`);
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
        <label className="form-label" htmlFor="shift-name">Nombre del turno</label>
        <input
          id="shift-name"
          className="form-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Turno mañana"
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="shift-start">Hora de inicio</label>
          <input
            id="shift-start"
            className="form-input"
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="shift-end">Hora de fin</label>
          <input
            id="shift-end"
            className="form-input"
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="shift-tol">Tolerancia (minutos)</label>
        <input
          id="shift-tol"
          className="form-input"
          type="number"
          min="0"
          value={form.toleranceMinutes}
          onChange={(e) => setForm({ ...form, toleranceMinutes: e.target.value })}
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
            'Registrar turno'
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
