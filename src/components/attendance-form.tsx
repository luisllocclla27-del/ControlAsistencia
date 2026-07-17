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
  const [isSuccess, setIsSuccess] = useState(false);
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

      const mins = payload.tardinessMinutes ?? 0;
      setMessage(
        mins > 0
          ? `Registro guardado — Tardanza: ${mins} min`
          : 'Registro guardado — Ingreso puntual ✓'
      );
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
          <label className="form-label" htmlFor="att-emp">ID del empleado</label>
          <input
            id="att-emp"
            className="form-input"
            value={form.employeeId}
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            placeholder="uuid o id del empleado"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="att-date">Fecha</label>
          <input
            id="att-date"
            className="form-input"
            type="date"
            value={form.workDate}
            onChange={(e) => setForm({ ...form, workDate: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="att-sched">Hora programada</label>
          <input
            id="att-sched"
            className="form-input"
            type="time"
            value={form.scheduledStart}
            onChange={(e) => setForm({ ...form, scheduledStart: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="att-in">Hora de ingreso</label>
          <input
            id="att-in"
            className="form-input"
            type="time"
            value={form.clockIn}
            onChange={(e) => setForm({ ...form, clockIn: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="att-out">Hora de salida</label>
          <input
            id="att-out"
            className="form-input"
            type="time"
            value={form.clockOut}
            onChange={(e) => setForm({ ...form, clockOut: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="att-notes">Observaciones</label>
          <input
            id="att-notes"
            className="form-input"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Opcional"
          />
        </div>
      </div>
      <div>
        <button className="btn btn-primary" type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="spinner" />
              Guardando...
            </>
          ) : (
            'Registrar asistencia'
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
