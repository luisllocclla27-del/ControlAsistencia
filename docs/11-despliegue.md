# Despliegue de la aplicacion

## Estrategia propuesta

- Frontend y despliegue: Vercel.
- Base de datos: Supabase PostgreSQL.
- Variables de entorno: credenciales de Supabase.
- Datos semilla: `supabase/seed.sql` para cargar un escenario de demostracion.

## Flujo de publicacion

1. Crear el proyecto en Supabase y ejecutar `supabase/schema.sql`.
2. Cargar `supabase/seed.sql` para disponer de datos de prueba.
3. Configurar las variables de entorno en Vercel.
4. Publicar la aplicacion desde el repositorio de GitHub.
5. Verificar las rutas `/api/employees`, `/api/shifts`, `/api/attendance` y `/api/roles`.

## Evidencia requerida

- URL publica de la aplicacion.
- Capturas del sistema funcionando.
- Capturas o registros del panel de base de datos.
- Descripcion breve de configuracion y publicacion.
