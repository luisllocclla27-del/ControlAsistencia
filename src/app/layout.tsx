import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AsistControl — Control de Asistencia y Retardos',
  description: 'Sistema web para registrar y monitorear la asistencia de empleados, con gestión de turnos, reportes de puntualidad y control de tardanzas.',
  keywords: ['asistencia', 'empleados', 'control', 'turnos', 'tardanza', 'puntualidad'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
