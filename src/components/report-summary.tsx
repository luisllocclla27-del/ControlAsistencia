'use client';

import { useEffect, useState } from 'react';
import { ResourceList } from './resource-list';

/* SVG Icons */
const ClipboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

interface ReportSummaryData {
  totalRecords: number;
  lateRecords: number;
  onTimeRecords: number;
  totalTardinessMinutes: number;
  employeeBreakdown?: {
    employeeId: string;
    employeeName: string;
    totalRecords: number;
    onTimeRecords: number;
    lateRecords: number;
    earlyDepartures: number;
    totalTardinessMinutes: number;
  }[];
}

export function ReportSummary() {
  const [summary, setSummary] = useState<ReportSummaryData | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await fetch('/api/reports');
        const payload = (await response.json()) as ReportSummaryData & { error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? 'No se pudo cargar el resumen.');
        }

        setSummary(payload);
        setStatus('done');
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : 'Error inesperado');
        setStatus('error');
      }
    }

    void loadSummary();
  }, []);

  const pctOnTime =
    summary && summary.totalRecords > 0
      ? Math.round((summary.onTimeRecords / summary.totalRecords) * 100)
      : 100;

  const avgTardiness =
    summary && summary.lateRecords > 0
      ? Math.round(summary.totalTardinessMinutes / summary.lateRecords)
      : 0;

  return (
    <div>
      {/* Loading */}
      {status === 'loading' && (
        <div className="panel">
          <div className="empty-state">
            <span className="loading-text">
              <span className="spinner" />
              Cargando reportes...
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="panel">
          <div className="toast toast-error" style={{ marginTop: 0 }}>
            <span className="toast-icon">—</span>
            {errorMsg}
          </div>
        </div>
      )}

      {/* Employee Detail View */}
      {status === 'done' && summary && selectedEmployee && (
        <div className="content-grid">
          <div className="panel" style={{ gridColumn: '1 / -1', border: 'none', background: 'transparent' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Reporte detallado de {selectedEmployee.name}</h2>
                <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Historial completo de asistencias y tardanzas</p>
              </div>
              <button 
                onClick={() => setSelectedEmployee(null)}
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
              >
                Volver al resumen
              </button>
            </div>
            <ResourceList
              title="Historial"
              description="Todas las marcaciones del empleado"
              endpoint={`/api/attendance?employeeId=${selectedEmployee.id}`}
              primaryField="workDate"
              secondaryFields={['clockIn', 'clockOut', 'tardinessMinutes', 'notes']}
            />
          </div>
        </div>
      )}

      {/* Data */}
      {status === 'done' && summary && !selectedEmployee && (
        <>
          {/* Metric cards row */}
          <div className="metrics-row">
            <article className="metric-card">
              <div className="metric-icon blue"><ClipboardIcon /></div>
              <strong>{summary.totalRecords}</strong>
              <span className="metric-label">Total registros</span>
            </article>
            <article className="metric-card">
              <div className="metric-icon green"><CheckCircleIcon /></div>
              <strong>{summary.onTimeRecords}</strong>
              <span className="metric-label">Puntuales</span>
            </article>
            <article className="metric-card">
              <div className="metric-icon red"><AlertIcon /></div>
              <strong>{summary.lateRecords}</strong>
              <span className="metric-label">Tardios</span>
            </article>
            <article className="metric-card">
              <div className="metric-icon amber"><ClockIcon /></div>
              <strong>{summary.totalTardinessMinutes}</strong>
              <span className="metric-label">Min. tardanza</span>
            </article>
          </div>

          {/* Details panels */}
          <div className="content-grid">
            {/* Punctuality rate */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Tasa de puntualidad</h2>
                  <p className="panel-description">Porcentaje de ingresos a tiempo</p>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: pctOnTime >= 80 ? 'var(--success)' : pctOnTime >= 50 ? 'var(--warning)' : 'var(--danger)',
                  lineHeight: 1,
                }}>
                  {pctOnTime}%
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 6 }}>
                  de ingresos puntuales
                </div>
              </div>

              <div className="progress-bar-wrapper">
                <div className="progress-bar-fill" style={{ width: `${pctOnTime}%` }} />
              </div>
              <div className="progress-labels">
                <span>{summary.onTimeRecords} puntuales</span>
                <span>{summary.lateRecords} tardios</span>
              </div>
            </div>

            {/* Detailed breakdown */}
            <div className="panel">
              <div className="panel-header">
                <div>
                  <h2>Detalle de tardanzas</h2>
                  <p className="panel-description">Analisis de los minutos de retraso</p>
                </div>
              </div>

              <div className="report-grid">
                <div className="report-card">
                  <span className="report-label">Promedio por tardanza</span>
                  <div className="report-value text-amber">{avgTardiness} min</div>
                </div>
                <div className="report-card">
                  <span className="report-label">Total acumulado</span>
                  <div className="report-value text-red">{summary.totalTardinessMinutes} min</div>
                </div>
                <div className="report-card">
                  <span className="report-label">Registros tardios</span>
                  <div className="report-value text-red">{summary.lateRecords}</div>
                </div>
                <div className="report-card">
                  <span className="report-label">Registros puntuales</span>
                  <div className="report-value text-green">{summary.onTimeRecords}</div>
                </div>
              </div>
            </div>

            {/* Employee Breakdown Table */}
            <div className="panel" style={{ gridColumn: '1 / -1' }}>
              <div className="panel-header">
                <div>
                  <h2>Reporte por Empleado</h2>
                  <p className="panel-description">Resumen completo consolidado por trabajador</p>
                </div>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>Asistencias</th>
                      <th>Puntuales</th>
                      <th>Tardanzas</th>
                      <th>Salidas Anticipadas</th>
                      <th>Total Min. Tardanza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.employeeBreakdown && summary.employeeBreakdown.map((emp) => (
                      <tr 
                        key={emp.employeeId} 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => setSelectedEmployee({ id: emp.employeeId, name: emp.employeeName })}
                        title="Haz clic para ver el reporte detallado"
                      >
                        <td><strong>{emp.employeeName}</strong></td>
                        <td>{emp.totalRecords}</td>
                        <td>
                          <span className={`record-badge ${emp.onTimeRecords > 0 ? 'badge-green' : ''}`}>
                            {emp.onTimeRecords}
                          </span>
                        </td>
                        <td>
                          <span className={`record-badge ${emp.lateRecords > 0 ? 'badge-amber' : ''}`}>
                            {emp.lateRecords}
                          </span>
                        </td>
                        <td>
                          <span className={`record-badge ${emp.earlyDepartures > 0 ? 'badge-red' : ''}`}>
                            {emp.earlyDepartures}
                          </span>
                        </td>
                        <td>
                          <span className={emp.totalTardinessMinutes > 0 ? 'text-amber' : ''} style={{ fontWeight: emp.totalTardinessMinutes > 0 ? 600 : 'normal' }}>
                            {emp.totalTardinessMinutes} min
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!summary.employeeBreakdown || summary.employeeBreakdown.length === 0) && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                          No hay registros suficientes para mostrar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
