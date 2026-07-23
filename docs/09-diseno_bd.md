# Diseno de base de datos

## Esquema de Base de Datos

El sistema está respaldado por PostgreSQL (Supabase) con las siguientes 4 tablas principales:

### 1. `employees` (Empleados)
Almacena la información del personal.
- `id` (uuid, PK)
- `employee_code` (text, único)
- `full_name` (text)
- `email` (text)
- `active` (bool)
- `created_at` (timestamptz)

### 2. `attendance_records` (Registros de Asistencia)
Almacena el registro diario de cada empleado.
- `id` (uuid, PK)
- `employee_id` (uuid, FK -> employees.id)
- `work_date` (text)
- `clock_in` (text)
- `clock_out` (text, opcional)
- `tardiness_minutes` (int4)
- `notes` (text, opcional)
- `shift_id` (text, FK -> shifts.id)
- `created_at` (timestamptz)

### 3. `shifts` (Turnos)
Define los horarios laborales aplicables.
- `id` (text, PK)
- `name` (text)
- `start_time` (text)
- `end_time` (text)
- `tolerance_minutes` (int4)
- `created_at` (timestamptz)

### 4. `roles` (Roles)
Define los roles del sistema para el acceso (ej. Admin, Supervisor).
- `id` (text, PK)
- `name` (text)
- `created_at` (timestamptz)

## Relaciones Principales
- **Un Empleado (`employees`)** tiene muchos **Registros de Asistencia (`attendance_records`)**. (Relación 1:N a través de `employee_id`).
- **Un Turno (`shifts`)** puede estar asociado a múltiples **Registros de Asistencia (`attendance_records`)**. (Relación 1:N a través de `shift_id`).

## Reglas de negocio

- Cada empleado debe tener un identificador unico.
- Un registro de asistencia no debe duplicarse para el mismo empleado y fecha.
- La tardanza se calcula comparando la hora de ingreso con el horario del turno.
- Los reportes deben basarse en datos guardados en la base de datos y no en valores manuales.
