## §6 DOC-6 — Plan Iterativo (Scrum)

### Propósito
Define el orden exacto en el que el orquestador y el agente construirán el sistema, basado en metodologías ágiles.

---

### Metadatos que debe llevar

    ---
    version: 1.0.0
    estado: cerrado
    doc: DOC-6-Plan
    titulo: Execution Plan (Scrum)
    autor: Luis
    fecha: 2026-06-28
    depende-de: DOC-5
    habilita: DOC-7-Ejecucion
    aprobado: true
    ---

---

### 6.1 Sprints de Construcción (MVP)

**Sprint 1: Fundación y Pruebas Unitarias**
- Configurar repositorio Next.js.
- Instalar Tailwind, Vitest y Playwright.
- Escribir funciones puras para cálculo de tiempo (`lib/attendance.ts`).
- Escribir pruebas unitarias (TDD).

**Sprint 2: Base de Datos y Backend**
- Configurar esquema de Supabase.
- Crear rutas de API definidas en `openapi.yaml`.
- Crear fallback JSON local para testing y demostraciones.
- Escribir pruebas de integración.

**Sprint 3: Interfaz de Usuario (UI)**
- Programar el Kiosko de marcación en la ruta raíz.
- Programar el Dashboard de administrador en `/admin`.
- Conectar frontend con backend.

**Sprint 4: Despliegue y QA**
- Desplegar proyecto en Vercel.
- Ejecutar suite E2E en producción.
- Finalizar documentación SDD y matriz de trazabilidad.
