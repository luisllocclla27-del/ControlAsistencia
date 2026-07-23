## §2 DOC-2 — TRD (Technical Requirements Document)

### Propósito
Traduce cada decisión del PRD al lenguaje técnico y define las herramientas a utilizar.

---

### Metadatos que debe llevar

    ---
    version: 1.1.0
    estado: cerrado
    doc: DOC-2-TRD
    titulo: Technical Requirements Document
    autor: Luis
    fecha: 2026-06-12
    depende-de: DOC-1
    habilita: DOC-3-UI-UX, DOC-5-Backend
    aprobado: true
    ---

---

### 2.1 Stack Tecnológico Elegido

| Capa          | Tecnología                         | Justificación                                                                   |
| ------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| Frontend      | Next.js 15 (App Router) + React 19 | Arquitectura serverless/edge rápida, ideal para SSR y SEO.                      |
| Estilos       | Tailwind CSS                       | Desarrollo rápido de UI basada en utilidad, sin CSS inflado.                    |
| Backend       | Next.js API Routes                 | Se elimina la necesidad de un servidor separado para simplificar el despliegue. |
| Base de Datos | Supabase (PostgreSQL)              | Permite backend as a service, Auth fácil y RLS.                                 |
| Fallback BD   | Local JSON (`.data/`)              | Permite hacer demostraciones si Supabase no está configurado.                   |
| Pruebas       | Vitest + Playwright                | Aseguramiento de calidad TDD/BDD.                                               |
| Despliegue    | Vercel                             | Integración natural con Next.js y GitHub para CI/CD.                            |

---

### 2.2 Restricciones Técnicas

1. **Rendimiento (Kiosko):** El endpoint de marcación debe responder en menos de 1 segundo para no crear filas en las oficinas.
2. **Disponibilidad:** El sistema debe operar en la nube (24/7).
3. **Escalabilidad:** Diseñado para soportar múltiples marcas simultáneas al inicio de turno.

---

### 2.3 Arquitectura de Alto Nivel

- El usuario final interactúa con páginas renderizadas en el cliente/servidor mediante React.
- El Kiosko envía un POST a `/api/employees/attendance`.
- La lógica de negocio (`src/lib/attendance.ts`) calcula tiempos y retardos.
- Los datos persisten en Supabase.
- El panel de Admin consume mediante peticiones GET para renderizar las tablas de reportes.
