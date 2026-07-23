# Manual de Usuario y Técnico (AsistControl)

## 1. Manual de Usuario (Para el Empleado)
1. **Acceso al Kiosko:** El empleado debe acercarse a la terminal (tablet o PC) en la entrada de la empresa.
2. **Marcación:** Debe hacer clic en el botón verde "Marcar Entrada" al iniciar su turno, o "Marcar Salida" al retirarse.
3. **Confirmación:** Esperar a que el sistema muestre la alerta (Toast) de color verde indicando "Marcación exitosa". Si la alerta es roja, significa que ya existe un registro para el día de hoy.

## 2. Manual de Usuario (Para el Administrador)
1. **Inicio de Sesión:** Ingresar a la ruta `/login`, seleccionar la cuenta "Dueño Admin" y presionar "Iniciar sesión".
2. **Revisión de Asistencias:** En el menú lateral, dirigirse a la pestaña "Asistencias".
3. **Interpretación de Datos:** 
   - Las filas en verde indican llegadas "A tiempo".
   - Las filas en rojo indican llegadas "Tarde", calculadas automáticamente en base a la hora límite (09:00 AM).

## 3. Manual de Instalación (Técnico)
1. Clonar el repositorio de GitHub.
2. Instalar dependencias con el comando `npm install`.
3. Iniciar el servidor en modo desarrollo con `npm run dev`.
4. Para ejecutar las pruebas unitarias: `npm run test` (Jest).
5. Para ejecutar las pruebas E2E: `npm run test:e2e-ui` (Playwright).
