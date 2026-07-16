'use client';

import { useState } from 'react';

interface FormState {
  employeeId: string;
  workDate: string;
  scheduledStart: string;
  clockIn: string;
  clockOut: string;
  notes: string;
}

const initialState: FormState = {
  employeeId: '',
  workDate: '',
  scheduledStart: '08:00',
  clockIn: '08:00',
  clockOut: '',
  notes: ''
};

export function AttendanceForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { error?: string; tardinessMinutes?: number };

      if (!response.ok) {
        throw new Error(payload.error ?? 'No fue posible guardar la asistencia.');
      }

      setMessage(`Registro guardado. Tardanza: ${payload.tardinessMinutes ?? 0} minutos.`);
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
        ID del empleado
        <input
          value={form.employeeId}
          onChange={(event) => setForm({ ...form, employeeId: event.target.value })}
          placeholder="uuid del empleado"
          required
        />
      </label>
      <label>
        Fecha
        <input
          type="date"
          value={form.workDate}
          onChange={(event) => setForm({ ...form, workDate: event.target.value })}
          required
        />
      </label>
      <label>
        Hora programada
        <input
          type="time"
          value={form.scheduledStart}
          onChange={(event) => setForm({ ...form, scheduledStart: event.target.value })}
          required
        />
      </label>
      <label>
        Hora de ingreso
        <input
          type="time"
          value={form.clockIn}
          onChange={(event) => setForm({ ...form, clockIn: event.target.value })}
          required
        />
      </label>
      <label>
        Hora de salida
        <input
          type="time"
          value={form.clockOut}
          onChange={(event) => setForm({ ...form, clockOut: event.target.value })}
        />
      </label>
      <label>
        Observaciones
        <textarea
          value={form.notes}
          onChange={(event) => setForm({ ...form, notes: event.target.value })}
          placeholder="Opcional"
          rows={3}
        />
      </label>
      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Guardando...' : 'Registrar asistencia'}
      </button>
      {message ? <p className="form-message">{message}</p> : null}
    </form>
  );
}
