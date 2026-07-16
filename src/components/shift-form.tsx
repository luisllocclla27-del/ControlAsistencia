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
        Nombre del turno
        <input
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="Turno mañana"
          required
        />
      </label>
      <label>
        Hora de inicio
        <input
          type="time"
          value={form.startTime}
          onChange={(event) => setForm({ ...form, startTime: event.target.value })}
          required
        />
      </label>
      <label>
        Hora de fin
        <input
          type="time"
          value={form.endTime}
          onChange={(event) => setForm({ ...form, endTime: event.target.value })}
          required
        />
      </label>
      <label>
        Tolerancia en minutos
        <input
          type="number"
          min="0"
          value={form.toleranceMinutes}
          onChange={(event) => setForm({ ...form, toleranceMinutes: event.target.value })}
          required
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Registrar turno'}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
