import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirigir siempre a la página de login
  redirect('/login');
}
