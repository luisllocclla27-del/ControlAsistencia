# Pruebas unitarias e integracion

## Pruebas unitarias

- Calculo de tardanza.
- Clasificacion de asistencia puntual o tardia.
- Resumen de minutos trabajados.
- Validacion de bordes como reloj de salida anterior al de entrada.
- Resumen vacio cuando no existen registros.

## Pruebas de integracion

- Registro de asistencia y persistencia en la base de datos.
- Consulta de historial por empleado.
- Generacion de reportes con datos reales.
- Registro de empleados con la ruta `/api/employees`.
- Registro de turnos con la ruta `/api/shifts`.
- Verificacion de roles con la ruta `/api/roles`.

## Evidencia esperada

- Casos de prueba escritos.
- Ejecucion automatizada en la terminal.
- Resultados correctos sin fallos criticos.

## Criterios de exito

- Las funciones puras deben devolver el resultado esperado en situaciones normales y bordes.
- Las rutas API deben aceptar datos validos y rechazar campos incompletos.
- El reporte debe conservar la consistencia entre totales, tardanzas y puntualidad.
