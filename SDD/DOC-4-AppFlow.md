## §4 DOC-4 — AppFlow

### Propósito
Describe el flujo exacto que el usuario sigue para interactuar con la aplicación.

---

### Metadatos que debe llevar

    ---
    version: 1.0.0
    estado: cerrado
    doc: DOC-4-AppFlow
    titulo: Application Flow
    autor: Luis
    fecha: 2026-07-22
    depende-de: DOC-3
    habilita: DOC-5-Backend
    aprobado: true
    ---

---

### 4.1 Flujo de Marcación (Empleado - MUST)

1. El sistema muestra la pantalla de inicio "Kiosko".
2. El empleado ingresa su código (ej. EMP-001).
3. El empleado presiona "Registrar".
4. El Frontend envía la petición POST a la API.
5. El sistema determina automáticamente (basado en el estado del empleado hoy) si es una Entrada o una Salida.
6. El sistema devuelve:
   - "Entrada Exitosa (Puntual)" (si es <= hora_inicio)
   - "Entrada Exitosa (Retardo de X minutos)"
   - "Salida Exitosa"
7. El Kiosko muestra el mensaje por 3 segundos y se resetea para el siguiente empleado.

### 4.2 Flujo de Administración (RRHH - MUST)

1. El administrador entra a `/admin`.
2. El sistema carga la tabla de reportes de asistencia consultando la API GET de records.
3. El administrador puede visualizar quién llegó tarde y ver el total consolidado de minutos de retardo por empleado (basado en la lógica `buildAttendanceSummary`).
