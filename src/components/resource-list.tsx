'use client';

import { useEffect, useState } from 'react';

interface ResourceListProps {
  title: string;
  description: string;
  endpoint: string;
  primaryField: string;
  secondaryFields?: string[];
}

/* SVG Icons */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const InboxIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </svg>
);

const FilterIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

/* Label mapping for prettier column headers */
const FIELD_LABELS: Record<string, string> = {
  fullName: 'Nombre',
  employeeCode: 'Codigo',
  email: 'Correo',
  name: 'Nombre',
  startTime: 'Inicio',
  endTime: 'Fin',
  toleranceMinutes: 'Tolerancia (min)',
  workDate: 'Fecha',
  clockIn: 'Entrada',
  clockOut: 'Salida',
  tardinessMinutes: 'Tardanza (min)',
  employeeId: 'Empleado',
  notes: 'Observaciones',
};

export function ResourceList({
  title,
  description,
  endpoint,
  primaryField,
  secondaryFields = [],
}: ResourceListProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        const payload = (await response.json()) as
          | Record<string, unknown>[]
          | { error?: string };

        if (!response.ok) {
          const errorPayload = payload as { error?: string };
          throw new Error(errorPayload.error ?? 'No fue posible cargar la informacion.');
        }

        setItems(Array.isArray(payload) ? payload : []);
        setStatus('done');
      } catch (error) {
        setErrorMsg(error instanceof Error ? error.message : 'Error inesperado');
        setStatus('error');
      }
    }

    void loadItems();
  }, [endpoint]);

  const allFields = [primaryField, ...secondaryFields];

  const filteredItems = items.filter((item) => {
    const searchableText = Object.values(item)
      .map((value) => String(value ?? ''))
      .join(' ')
      .toLowerCase();
    return searchableText.includes(query.toLowerCase());
  });

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
          <p className="panel-description">{description}</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-wrapper">
        <span className="search-icon"><SearchIcon /></span>
        <input
          type="search"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar registros..."
        />
      </div>

      {/* Record count */}
      {status === 'done' && items.length > 0 && (
        <div className="table-info">
          <span className="record-count">
            Mostrando {filteredItems.length} de {items.length}
          </span>
          <span className={`record-badge ${filteredItems.length === items.length ? 'badge-blue' : 'badge-amber'}`}>
            {filteredItems.length} registro{filteredItems.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Loading state */}
      {status === 'loading' && (
        <div className="empty-state">
          <span className="loading-text">
            <span className="spinner" />
            Cargando datos...
          </span>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="toast toast-error" style={{ marginTop: 0 }}>
          <span className="toast-icon">—</span>
          {errorMsg}
        </div>
      )}

      {/* Empty state */}
      {status === 'done' && items.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon"><InboxIcon /></div>
          Sin registros cargados.
        </div>
      )}

      {/* No matches */}
      {status === 'done' && items.length > 0 && filteredItems.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon"><FilterIcon /></div>
          No hay coincidencias para ese filtro.
        </div>
      )}

      {/* Data table */}
      {filteredItems.length > 0 && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                {allFields.map((field) => (
                  <th key={field}>{FIELD_LABELS[field] ?? field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={String(item.id ?? index)}>
                  <td style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                    {index + 1}
                  </td>
                  {allFields.map((field) => {
                    const raw = item[field];
                    const value = String(raw ?? '—');

                    /* Special badge for tardinessMinutes */
                    if (field === 'tardinessMinutes') {
                      const num = Number(raw ?? 0);
                      return (
                        <td key={field}>
                          <span className={`record-badge ${num > 0 ? 'badge-red' : 'badge-green'}`}>
                            {num > 0 ? `${num} min` : 'Puntual'}
                          </span>
                        </td>
                      );
                    }

                    return <td key={field}>{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
