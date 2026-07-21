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

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: 'var(--accent)', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>MODO DEMO SEGURO</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Admin Card */}
            <div 
              onClick={() => setCode('admin')}
              style={{
                background: code === 'admin' ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
                border: `1px solid ${code === 'admin' ? 'var(--accent)' : 'var(--border)'}`,
                padding: '16px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%', border: `5px solid ${code === 'admin' ? 'var(--accent)' : 'var(--border)'}`,
                  background: code === 'admin' ? '#fff' : 'transparent',
                  transition: 'all 0.2s ease'
                }} />
                <strong style={{ color: code === 'admin' ? 'var(--accent)' : 'var(--text-primary)' }}>Dueño administrador</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Gestión completa, reportes y configuración.
              </p>
            </div>
            
            {/* Employee Card */}
            <div 
              onClick={() => setCode('EMP-001')}
              style={{
                background: code === 'EMP-001' ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
                border: `1px solid ${code === 'EMP-001' ? 'var(--accent)' : 'var(--border)'}`,
                padding: '16px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%', border: `5px solid ${code === 'EMP-001' ? 'var(--accent)' : 'var(--border)'}`,
                  background: code === 'EMP-001' ? '#fff' : 'transparent',
                  transition: 'all 0.2s ease'
                }} />
                <strong style={{ color: code === 'EMP-001' ? 'var(--accent)' : 'var(--text-primary)' }}>Empleado (Kiosko)</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Simulación del marcador de asistencia diario.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="auth-form form-grid">
          <div className="form-group">
            <label className="form-label" style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>USUARIO DEMO</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Selecciona un rol arriba..."
              className="form-input"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '12px' }}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
