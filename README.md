# Sistema de control de asistencia y retardos para empleados

Proyecto final para calidad de software basado en SDD, Scrum, pruebas automatizadas y despliegue en Vercel con base de datos en Supabase.

## Estado del proyecto

- Documentacion en Markdown: creada y en expansion
- Aplicacion web: MVP funcional en desarrollo
- Base de datos: esquema inicial y datos semilla disponibles
- Pruebas: helpers unitarios iniciales implementados
- Despliegue: preparado para Vercel + Supabase
- Trazabilidad y cierre: matriz de trazabilidad y checklist de entrega disponibles
- Control de versiones: documentado con estrategia de Git y GitHub

## Estructura

- `docs/`: informe base en Markdown
- `src/`: codigo fuente de la aplicacion
- `supabase/`: esquema y reglas de la base de datos
- `tests/`: pruebas unitarias e integracion

## Flujo de trabajo sugerido

1. Ejecutar `supabase/schema.sql` en el proyecto de Supabase.
2. Cargar `supabase/seed.sql` para disponer de datos de demostracion.
3. Configurar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Levantar la aplicacion en desarrollo con `npm run dev`.
5. Publicar en Vercel usando el repositorio de GitHub.

## Siguiente paso

Completar la exportacion del informe a Word y la presentacion a PPT usando los archivos de `docs/` como fuente.
