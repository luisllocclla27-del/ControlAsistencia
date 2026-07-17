'use client';

import { useEffect, useState } from 'react';

interface ResourceListProps {
  title: string;
  description: string;
  endpoint: string;
  primaryField: string;
  secondaryFields?: string[];
}

export function ResourceList({ title, description, endpoint, primaryField, secondaryFields = [] }: ResourceListProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Cargando...');

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(endpoint);
        const payload = (await response.json()) as Record<string, unknown>[] | { error?: string };

        if (!response.ok) {
          const errorPayload = payload as { error?: string };
          throw new Error(errorPayload.error ?? 'No fue posible cargar la informacion.');
        }

        setItems(Array.isArray(payload) ? payload : []);
        setStatus('');
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Error inesperado');
      }
    }

    void loadItems();
  }, [endpoint]);

  const filteredItems = items.filter((item) => {
    const searchableText = Object.values(item)
      .map((value) => String(value ?? ''))
      .join(' ')
      .toLowerCase();

    return searchableText.includes(query.toLowerCase());
  });

  return (
    <section className="panel">
      <h2>{title}</h2>
      <p className="hero-copy" style={{ marginTop: '8px' }}>{description}</p>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filtrar registros"
        style={{
          width: '100%',
          marginTop: '12px',
          padding: '12px 14px',
          borderRadius: '14px',
          border: '1px solid rgba(70, 50, 30, 0.18)',
          background: 'rgba(255,255,255,0.78)'
        }}
      />
      {items.length > 0 ? (
        <p className="hero-copy" style={{ marginTop: '10px' }}>
          Mostrando {filteredItems.length} de {items.length} registros.
        </p>
      ) : null}
      {status ? <p className="hero-copy" style={{ marginTop: '8px' }}>{status}</p> : null}
      {!status && items.length === 0 ? <p className="hero-copy">Sin registros cargados.</p> : null}
      {!status && items.length > 0 && filteredItems.length === 0 ? (
        <p className="hero-copy">No hay coincidencias para ese filtro.</p>
      ) : null}
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index) => {
            const values = [primaryField, ...secondaryFields]
              .map((field) => String(item[field] ?? ''))
              .filter((value) => value.length > 0);

            return (
              <li key={String(item.id ?? index)}>{values.join(' - ')}</li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
