'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EmpleadoPortal() {
  const [time, setTime] = useState<Date | null>(null);
  const [employeeCode, setEmployeeCode] = useState<string>('');
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    const code = localStorage.getItem('employeeCode');
    if (!code) {
      router.push('/login');
    } else {
      setEmployeeCode(code);
    }
    
    return () => clearInterval(timer);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('employeeCode');
    router.push('/login');
  };

  const registrarAsistencia = async (tipo: 'entrada' | 'salida') => {
    setLoading(true);
    setStatus({ message: '', type: null });

    try {
      const response = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeCode, type: tipo })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar marcación');
      }

      const ahora = new Date();
      const horaFormateada = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setStatus({
        type: 'success',
        message: `¡${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada correctamente a las ${horaFormateada}!`
      });
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Ocurrió un error al registrar. Inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!time) return null;

  return (
    <div className="app-layout" style={{ flexDirection: 'column' }}>
      <header className="kiosk-header">
        <div className="kiosk-brand">
          <div className="kiosk-brand-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <span>Terminal de Asistencia</span>
        </div>
        <div className="kiosk-user">
          <span>Usuario: <strong>{employeeCode}</strong></span>
          <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
      </header>

      <main className="kiosk-main">
        <div className="kiosk-clock">
          <div className="kiosk-time">{time.toLocaleTimeString('es-ES')}</div>
          <div className="kiosk-date">{time.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>

        <div className="kiosk-actions">
          <button onClick={() => registrarAsistencia('entrada')} disabled={loading} className="kiosk-btn entrada">
            <div className="kiosk-btn-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3>Marcar Entrada</h3>
            <p>Registrar el inicio de tu turno</p>
          </button>

          <button onClick={() => registrarAsistencia('salida')} disabled={loading} className="kiosk-btn salida">
            <div className="kiosk-btn-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3>Marcar Salida</h3>
            <p>Registrar el fin de tu turno</p>
          </button>
        </div>

        {status.message && (
          <div className={`kiosk-status ${status.type === 'success' ? 'toast-success' : 'toast-error'}`}>
            <div className="toast-icon">
              {status.type === 'success' ? '✓' : '⚠'}
            </div>
            {status.message}
          </div>
        )}
      </main>
    </div>
  );
}
