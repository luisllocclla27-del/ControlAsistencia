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
    // Solo en el cliente
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Obtener código de empleado de la "sesión"
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
      // Mocked request to API
      // En un entorno real se haría un POST a /api/attendance
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const ahora = new Date();
      const horaFormateada = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      
      setStatus({
        type: 'success',
        message: `¡${tipo === 'entrada' ? 'Entrada' : 'Salida'} registrada correctamente a las ${horaFormateada}!`
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Ocurrió un error al registrar. Inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!time) return null; // Evitar hidratación mismatch

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Terminal de Asistencia</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-400">
            Usuario: <strong className="text-white">{employeeCode}</strong>
          </span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Kiosk Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        
        {/* Reloj Digital */}
        <div className="text-center mb-16">
          <h2 className="text-7xl font-light tracking-tight tabular-nums mb-4 text-blue-400">
            {time.toLocaleTimeString('es-ES')}
          </h2>
          <p className="text-xl text-slate-400">
            {time.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <button
            onClick={() => registrarAsistencia('entrada')}
            disabled={loading}
            className="group relative bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center transition-all hover:bg-emerald-500/10 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-emerald-400 mb-2">Marcar Entrada</h3>
            <p className="text-slate-400 text-center">Registrar el inicio de tu turno</p>
          </button>

          <button
            onClick={() => registrarAsistencia('salida')}
            disabled={loading}
            className="group relative bg-slate-900 border border-amber-500/30 hover:border-amber-500 rounded-2xl p-8 flex flex-col items-center justify-center transition-all hover:bg-amber-500/10 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-amber-400 mb-2">Marcar Salida</h3>
            <p className="text-slate-400 text-center">Registrar el fin de tu turno</p>
          </button>
        </div>

        {/* Status Message */}
        {status.message && (
          <div className={`mt-8 px-6 py-4 rounded-lg flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4 ${
            status.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {status.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <span className="font-medium">{status.message}</span>
          </div>
        )}
      </main>
    </div>
  );
}
