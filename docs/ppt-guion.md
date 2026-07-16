# Guion para presentacion

## Diapositiva 1. Portada

- Nombre del proyecto: Sistema de control de asistencia y retardos para empleados.
- Autor, curso, docente y fecha.
- Idea fuerza: una aplicacion web con base de datos para mejorar trazabilidad y control.

## Diapositiva 2. Problema

- El control manual de asistencia genera errores y poca trazabilidad.
- La informacion suele quedar dispersa en archivos o formatos no integrados.
- Se requiere una solucion centralizada y consultable.

## Diapositiva 3. Objetivos y justificacion

- Objetivo general: desarrollar un sistema web con base de datos para controlar asistencia y retardos.
- Objetivos especificos: analizar, disenar, implementar, probar y desplegar la solucion.
- Justificacion: automatizar el registro reduce errores y mejora la gestion.

## Diapositiva 4. Alcance y limitaciones

- Incluye empleados, turnos, asistencia, roles y reportes.
- No incluye biometria, nomina ni integraciones complejas.
- Se prioriza un MVP funcional y defendible.

## Diapositiva 5. SDD y Scrum

- SDD: requisitos -> diseno -> implementacion -> verificacion.
- Scrum: backlog, sprints y entregables incrementales.
- Evidencia: trazabilidad entre historias de usuario, tablas y pruebas.

## Diapositiva 6. Diseno de base de datos

- Tablas principales: roles, profiles, employees, shifts, attendance_records y audit_logs.
- Relaciones clave entre empleados, turnos y registros de asistencia.
- Reglas de negocio: un registro por empleado y fecha, tardanza calculada automaticamente.

## Diapositiva 7. Implementacion y pruebas

- Frontend en Next.js con formularios para empleados, asistencia, turnos y roles.
- Rutas API para consultar y registrar datos.
- Pruebas unitarias para tardanza, minutos trabajados y resumen de reportes.

## Diapositiva 8. Despliegue y evidencia

- Despliegue propuesto: Vercel.
- Base de datos: Supabase PostgreSQL.
- Evidencia: capturas, esquema SQL, semillas, pruebas y GitHub.

## Diapositiva 9. Resultados

- Se obtuvo un MVP funcional con estructura completa.
- La documentacion en Markdown cubre el ciclo de vida del software.
- Se preparo un flujo reproducible para demostracion academica.

## Diapositiva 10. Conclusiones

- El proyecto demuestra SDD, Scrum, pruebas y despliegue en un solo flujo.
- La solucion es viable como caso academico por su alcance y trazabilidad.
- La siguiente mejora seria ampliar reportes y persistencia real en el entorno final.
