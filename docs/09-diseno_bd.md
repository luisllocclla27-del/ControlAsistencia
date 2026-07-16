# Diseno de base de datos

## Tablas iniciales

- roles
- profiles
- employees
- shifts
- attendance_records
- audit_logs

## Relaciones principales

- Un rol puede tener muchos perfiles.
- Un perfil puede estar asociado a un empleado.
- Un empleado puede tener muchos registros de asistencia.
- Un turno puede asociarse a varios registros de asistencia.

## Reglas de negocio

- Cada empleado debe tener un identificador unico.
- Un registro de asistencia no debe duplicarse para el mismo empleado y fecha.
- La tardanza se calcula comparando la hora de ingreso con el horario del turno.
- Los reportes deben basarse en datos guardados en la base de datos y no en valores manuales.
