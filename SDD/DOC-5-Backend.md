## §5 DOC-5 — Backend

### Propósito
Define la estructura de los datos y el contrato de las APIs antes de programarlas.

---

### Metadatos que debe llevar

    ---
    version: 1.1.4
    estado: cerrado
    doc: DOC-5-Backend
    titulo: Backend & Database Spec
    autor: Luis
    fecha: 2026-06-25
    depende-de: DOC-4
    habilita: DOC-6-Plan
    aprobado: true
    ---

---

### 5.1 Esquema de Base de Datos (Supabase)

1. **Tabla `roles`**
   - id (UUID)
   - name (String - 'ADMIN', 'EMPLOYEE')

2. **Tabla `employees`**
   - id (UUID)
   - fullName (String)
   - employeeCode (String, Unique)
   - roleId (FK -> roles.id)

3. **Tabla `attendance_records`**
   - id (UUID)
   - employeeId (FK -> employees.id)
   - workDate (Date)
   - clockIn (Time)
   - clockOut (Time, Nullable)
   - tardinessMinutes (Int)

### 5.2 Contrato API (OpenAPI)

Toda la definición de rutas, parámetros y respuestas está documentada formalmente en el archivo `openapi.yaml` ubicado en la raíz del proyecto. Este archivo sirve como la Única Fuente de Verdad para las comunicaciones HTTP entre cliente y servidor.

Rutas principales:
- `GET /api/employees`
- `POST /api/employees`
- `GET /api/attendance`
- `POST /api/attendance/mark`

### 5.3 Lógica Crítica (Pruebas Unitarias)

Las reglas para calcular tardanzas están abstraídas en funciones puras en `src/lib/attendance.ts` y `src/lib/report.ts` las cuales están rigurosamente cubiertas por pruebas unitarias usando Vitest para asegurar que no hay errores matemáticos al calcular la nómina.