# Sistema de control de asistencia y retardos para empleados

Proyecto final para calidad de software basado en SDD, Scrum, pruebas automatizadas y despliegue en Vercel con base de datos en Supabase.

Repositorio: https://github.com/luisllocclla27-del/ControlAsistencia

## Estado del proyecto

- Documentacion en Markdown: creada y en expansion
- Aplicacion web: MVP funcional en desarrollo
- Base de datos: esquema inicial y datos semilla disponibles
- Base de datos: esquema inicial, datos semilla y respaldo local para demo sin Supabase
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

1. Clonar el repositorio desde GitHub.
2. Instalar dependencias con `npm install`.
3. Ejecutar `supabase/schema.sql` en el proyecto de Supabase.
4. Cargar `supabase/seed.sql` para disponer de datos de demostracion.
5. Si quieres usar Supabase, configurar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en un archivo `.env.local`.
6. Levantar la aplicacion en desarrollo con `npm run dev`.
7. Ejecutar pruebas con `npm run test`.
8. Publicar en Vercel usando el repositorio de GitHub.

## Funcionamiento sin Supabase

La aplicacion incluye un respaldo local en `.data/control-asistencia.json`. Si no se definen credenciales de Supabase, los formularios y listados siguen funcionando con ese almacenamiento local para la demostracion.

## Scripts disponibles

- `npm run dev`: inicia la aplicacion en modo desarrollo.
- `npm run build`: genera la compilacion de produccion.
- `npm run start`: ejecuta la aplicacion compilada.
- `npm run test`: ejecuta las pruebas automatizadas.
- `npm run lint`: revisa el codigo con ESLint.
- `npm run typecheck`: valida tipos con TypeScript.

## Siguiente paso

Completar la exportacion del informe a Word y la presentacion a PPT usando los archivos de `docs/` como fuente.
