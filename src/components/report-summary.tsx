'use client';

import { useEffect, useState } from 'react';

interface ReportSummaryData {
  totalRecords: number;
  lateRecords: number;
  onTimeRecords: number;
  totalTardinessMinutes: number;
}

export function ReportSummary() {
  const [summary, setSummary] = useState<ReportSummaryData | null>(null);
  const [message, setMessage] = useState('Cargando resumen...');

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await fetch('/api/reports');
        const payload = (await response.json()) as ReportSummaryData & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? 'No se pudo cargar el resumen.');
        }

        setSummary(payload);
        setMessage('');
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Error inesperado');
      }
    }

    void loadSummary();
  }, []);

  return (
    <section className="panel" style={{ marginTop: '18px' }}>
      <h2>Resumen de reportes</h2>
      {message ? <p className="hero-copy" style={{ marginTop: '8px' }}>{message}</p> : null}
      {summary ? (
        <ul>
          <li>Total de registros: {summary.totalRecords}</li>
          <li>Registros tardios: {summary.lateRecords}</li>
          <li>Registros puntuales: {summary.onTimeRecords}</li>
          <li>Minutos acumulados de tardanza: {summary.totalTardinessMinutes}</li>
        </ul>
      ) : null}
    </section>
  );
}
