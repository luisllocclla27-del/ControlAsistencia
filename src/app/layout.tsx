import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Control de asistencia y retardos',
  description: 'Sistema web para registrar asistencia de empleados con base de datos y pruebas automatizadas.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
