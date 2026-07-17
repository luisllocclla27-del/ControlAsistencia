'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (code.toLowerCase() === 'admin') {
        localStorage.setItem('userRole', 'admin');
        router.push('/admin');
      } else if (code.trim().length > 0) {
        localStorage.setItem('userRole', 'employee');
        localStorage.setItem('employeeCode', code.toUpperCase());
        router.push('/empleado');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
        <h1 className="auth-title">AsistControl</h1>
        <p className="auth-subtitle">Ingresa tu código para continuar</p>

        <form onSubmit={handleLogin} className="auth-form form-grid">
          <div className="form-group">
            <label className="form-label">Código de Acceso</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej. EMP-001 o 'admin'"
              className="form-input"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '12px' }}>
            {loading ? 'Cargando...' : 'Ingresar al Sistema'}
          </button>
        </form>

        <div className="auth-hint">
          <strong style={{ color: 'var(--text-primary)' }}>Pistas para la demo:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>Ingresa <strong>admin</strong> para ir al Dashboard.</li>
            <li>Ingresa cualquier otro código para el Kiosko.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
