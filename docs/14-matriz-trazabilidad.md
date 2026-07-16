# Matriz de trazabilidad

| Requisito | Historia de usuario | Modulo | Tabla / ruta | Prueba |
| :--- | :--- | :--- | :--- | :--- |
| Registrar empleados | HU01 | Administracion de empleados | `employees` / `/api/employees` | Creacion de empleado |
| Definir turnos | HU02 | Gestion de turnos | `shifts` / `/api/shifts` | Creacion de turno |
| Registrar asistencia | HU03 | Registro de asistencia | `attendance_records` / `/api/attendance` | Tardanza y guardado |
| Calcular tardanzas | HU03, HU04 | Registro de asistencia | `calculateTardinessMinutes` | Caso puntual y tardio |
| Consultar reportes | HU05 | Reportes | `/api/reports` | Resumen de asistencia |
| Gestionar roles | HU07 | Autenticacion y roles | `roles` / `/api/roles` | Registro de rol |

## Observacion

La matriz muestra como cada requisito funcional del proyecto se conecta con una historia de usuario, un modulo, una estructura de datos y una prueba automatizada o de integracion. Esto facilita demostrar SDD ante el docente.
