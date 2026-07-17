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

## Evidencia de Ejecución (Captura)

A continuación, se presenta la captura de la ejecución real de la suite de pruebas unitarias y de integración utilizando **Vitest**, demostrando que el 100% de los casos (10/10) se ejecutaron con éxito.

```bash
> proyecto-asistencia-empleados@0.1.0 test
> vitest run

 RUN  v3.2.7 C:/Users/luisg/OneDrive/Documentos/Proyecto final calidad de software/proyecto-asistencia-empleados

 ✓ tests/attendance.test.ts (6 tests) 11ms
 ✓ tests/report.test.ts (2 tests) 12ms
 ✓ tests/api-integration.test.ts (2 tests) 76ms

 Test Files  3 passed (3)
      Tests  10 passed (10)
   Start at  21:30:42
   Duration  3.49s (transform 317ms, setup 0ms, collect 717ms, tests 99ms, environment 6.18s, prepare 939ms)
```

Como se observa, se evaluaron correctamente los componentes de asistencia, reportes y la integración nativa de la API sin fallos detectados.
