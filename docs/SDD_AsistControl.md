# Software Design Document (SDD) & Specifications
**Proyecto:** Sistema de Asistencia de Empleados (AsistControl)
**Versión:** 1.0.0

## 1. Introducción
El presente documento (SDD) centraliza las especificaciones funcionales, técnicas y de arquitectura del proyecto AsistControl. Actúa como la fuente única de verdad (Single Source of Truth) para el desarrollo guiado por especificaciones (Specification-Driven Development).

## 2. Arquitectura del Sistema
El sistema sigue un modelo cliente-servidor desacoplado (Single Page Application):
- **Frontend (Capa de Presentación):** Next.js (React) + Tailwind CSS.
- **Backend (Capa de Negocio y Datos):** Next.js API Routes (Node.js).
- **Validación de Especificaciones (Spec Kit):** Zod (Schema Validation).

## 3. Especificaciones de Funcionalidades (Specs)

### Spec 01: Módulo de Kiosko (Marcación)
**Actor:** Empleado
**Instrucción / Comportamiento Esperado:**
1. El empleado ingresa al kiosko y visualiza la hora en tiempo real.
2. El empleado presiona "Marcar Entrada" o "Marcar Salida".
3. **Condición de fallo (Negative Path):** Si el empleado ya registró una entrada en la fecha actual, el sistema debe bloquear una segunda entrada y mostrar una alerta roja.
4. **Condición de éxito (Happy Path):** Si la marcación es válida, el sistema muestra una alerta verde y persiste el registro en el archivo/base de datos.

### Spec 02: Módulo de Autenticación
**Actor:** Administrador / Empleado
**Instrucción / Comportamiento Esperado:**
1. El usuario selecciona su cuenta o ingresa sus credenciales.
2. Si el rol es `admin`, el sistema lo redirige a la ruta `/admin` tras validar el inicio de sesión.
3. Si el rol es `empleado`, el sistema lo redirige a `/empleado` (Kiosko).

### Spec 03: Panel de Reportes (Dashboard)
**Actor:** Administrador (Dueño)
**Instrucción / Comportamiento Esperado:**
1. El administrador visualiza tarjetas con métricas resumidas (Total empleados, Asistencias de hoy, Tardanzas).
2. El administrador tiene acceso a una tabla con el registro detallado de las horas de llegada.
3. Se calcula automáticamente si un empleado llegó "A tiempo" o "Tarde" basado en la hora límite (09:00 AM).

## 4. Contrato de la API (Open Spec)
Las rutas del servidor respetan el siguiente contrato de datos:
- **Ruta:** `POST /api/attendance/mark`
- **Cuerpo de la petición (Input):** `{ "employeeCode": "string", "type": "entrada" | "salida" }`
- **Respuesta Exitosa:** `200 OK` con `{ "message": "..." }`
- **Respuesta de Error:** `400 Bad Request` con `{ "error": "..." }`

## 5. Pruebas y Validación (QA)
- **Pruebas Unitarias (Jest):** Verifican matemáticamente las especificaciones de cálculo de tardanzas.
- **Pruebas E2E (Playwright):** Robot automatizado que lee este documento de especificaciones y verifica paso a paso que la interfaz gráfica cumpla con los comportamientos descritos en el *Spec 01* y *Spec 02*.
