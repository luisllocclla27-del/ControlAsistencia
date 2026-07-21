# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Autenticación y Kiosko (E2E QA) >> Simula el flujo completo de marcación de un empleado
- Location: e2e\login.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/admin/
Received string:  "http://localhost:3000/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:3000/login"

```

```yaml
- alert
- img
- heading "AsistControl" [level=1]
- paragraph: Ingresa tu código para continuar
- text: MODO DEMO SEGURO
- strong: Dueño Admin
- paragraph: Gestión total.
- strong: Ana (EMP-001)
- paragraph: Kiosko empleado 1.
- strong: Luis (EMP-002)
- paragraph: Kiosko empleado 2.
- strong: Carlos (EMP-003)
- paragraph: Kiosko empleado 3.
- text: USUARIO DEMO
- textbox "Selecciona un rol arriba...": admin
- button "Iniciar sesión"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Autenticación y Kiosko (E2E QA)', () => {
  4  |   test('Simula el flujo completo de marcación de un empleado', async ({ page }) => {
  5  |     // 1. Navegar a la página de inicio de sesión
  6  |     await page.goto('/login');
  7  | 
  8  |     // 2. Verificar que los elementos visuales críticos estén presentes
  9  |     await expect(page.locator('h1.auth-title')).toContainText('AsistControl');
  10 | 
  11 |     // 3. Robot hace clic en la tarjeta de demostración de "Ana"
  12 |     // Buscamos cualquier elemento que contenga "Ana" en el texto
  13 |     await page.getByText('Ana (EMP-001)').click();
  14 | 
  15 |     // 4. Robot hace clic en el botón de submit
  16 |     await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  17 | 
  18 |     // 5. Verificamos que el sistema haga la redirección correctamente hacia la ruta de empleado
  19 |     await expect(page).toHaveURL(/.*\/empleado/, { timeout: 5000 });
  20 | 
  21 |     // 6. Validamos que la pantalla de Kiosko esté cargada para este usuario
  22 |     await expect(page.getByText('EMP-001')).toBeVisible();
  23 | 
  24 |     // 7. El robot hace clic en "Marcar Entrada"
  25 |     await page.getByRole('button', { name: /Marcar Entrada/i }).click();
  26 | 
  27 |     // 8. El robot verifica que el sistema devuelva el mensaje de éxito (Toast)
  28 |     await expect(page.locator('.toast-success')).toContainText('registrada correctamente');
  29 | 
  30 |     // 9. El robot Cierra Sesión para volver a la pantalla principal
  31 |     await page.getByRole('button', { name: /Cerrar Sesión/i }).click();
  32 |     await expect(page).toHaveURL(/.*\/login/);
  33 | 
  34 |     // 10. Ahora el robot inicia sesión como Administrador
  35 |     await page.getByText('Dueño Admin').click();
  36 |     await page.getByRole('button', { name: /Iniciar sesión/i }).click();
> 37 |     await expect(page).toHaveURL(/.*\/admin/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  38 | 
  39 |     // 11. El robot navega a la pestaña de "Asistencias" en el Dashboard
  40 |     await page.getByRole('button', { name: /Asistencias/i }).click();
  41 | 
  42 |     // 12. Verifica visualmente que los datos estén en la tabla
  43 |     await expect(page.getByText('Ana Perez').first()).toBeVisible();
  44 |   });
  45 | });
  46 | 
```