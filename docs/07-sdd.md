# Analisis y diseno bajo SDD

## Vision de producto

El sistema permite centralizar el control de asistencia y retardos de empleados en una aplicacion web con base de datos. El usuario principal puede registrar personal, definir turnos, capturar asistencias y revisar reportes historicos sin depender de hojas de calculo manuales.

## Requisitos funcionales

- RF01: Registrar empleados con codigo, nombre, correo y estado.
- RF02: Registrar turnos con hora de inicio, hora de fin y tolerancia.
- RF03: Registrar entradas y salidas de asistencia por empleado y fecha.
- RF04: Calcular minutos de tardanza segun el turno asignado.
- RF05: Consultar historial de asistencia por empleado.
- RF06: Generar reportes basicos por rango de fechas.
- RF07: Gestionar acceso por roles para administrador y supervisor.

## Requisitos no funcionales

- RNF01: La aplicacion debe ser accesible desde navegador web.
- RNF02: La informacion debe persistirse en PostgreSQL.
- RNF03: La logica critica debe contar con pruebas unitarias.
- RNF04: Los modulos principales deben validar el flujo de datos con pruebas de integracion.
- RNF05: La aplicacion debe poder desplegarse en un entorno publico.

## Historias de usuario

- HU01: Como administrador, quiero registrar empleados para tener control del personal.
- HU02: Como administrador, quiero definir turnos para comparar la hora real con la hora programada.
- HU03: Como encargado, quiero registrar entradas y salidas para llevar asistencia diaria.
- HU04: Como supervisor, quiero ver tardanzas acumuladas para detectar incumplimientos.
- HU05: Como supervisor, quiero consultar reportes por fecha para revisar comportamiento historico.

## Criterios de aceptacion

- CA01: El sistema guarda empleados y turnos en la base de datos.
- CA02: El sistema no permite duplicar registros de asistencia para el mismo empleado y fecha.
- CA03: El sistema calcula tardanza cuando la hora de ingreso supera la hora del turno.
- CA04: El sistema muestra historiales y reportes con datos consistentes.
- CA05: Las reglas criticas deben pasar pruebas automatizadas.

## Casos de uso resumidos

### Caso de uso: Registrar empleado

Actor principal: administrador.
Resultado esperado: el empleado queda disponible para los modulos de asistencia y reportes.

### Caso de uso: Registrar asistencia

Actor principal: encargado.
Resultado esperado: la asistencia se guarda y se calcula la tardanza asociada al turno.

### Caso de uso: Consultar reportes

Actor principal: supervisor.
Resultado esperado: el sistema muestra un resumen de asistencia por rango de fechas.

## Trazabilidad inicial

- RF01 -> tabla employees
- RF02 -> tabla shifts
- RF03 -> tabla attendance_records
- RF04 -> funcion calculateTardinessMinutes
- RF05 -> consulta por employee_id sobre attendance_records
- RF06 -> componente o endpoint de reportes
- RF07 -> tablas roles y profiles

## Suposiciones de diseno

- La hora de referencia se maneja en formato de 24 horas.
- La tardanza se calcula en minutos enteros.
- Cada empleado puede tener un unico registro por fecha.
- El sistema inicial no incluye biometria ni hardware externo.
