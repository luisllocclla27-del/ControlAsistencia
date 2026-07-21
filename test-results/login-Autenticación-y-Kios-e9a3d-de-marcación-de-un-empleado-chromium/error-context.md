# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Autenticación y Kiosko (E2E QA) >> Simula el flujo completo de marcación de un empleado
- Location: e2e\login.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /Asistencias/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]
  - generic [ref=e12]:
    - complementary [ref=e13]:
      - heading "AsistControl Panel de gestion" [level=2] [ref=e15]:
        - img [ref=e17]
        - generic [ref=e20]:
          - text: AsistControl
          - generic [ref=e21]: Panel de gestion
      - navigation [ref=e22]:
        - generic [ref=e23]: Principal
        - button "Dashboard" [ref=e24] [cursor=pointer]:
          - img [ref=e26]
          - text: Dashboard
        - generic [ref=e29]: Registros
        - button "Empleados" [ref=e30] [cursor=pointer]:
          - img [ref=e32]
          - text: Empleados
        - button "Asistencia" [ref=e37] [cursor=pointer]:
          - img [ref=e39]
          - text: Asistencia
        - button "Turnos" [ref=e41] [cursor=pointer]:
          - img [ref=e43]
          - text: Turnos
        - generic [ref=e46]: Sistema
        - button "Roles" [ref=e47] [cursor=pointer]:
          - img [ref=e49]
          - text: Roles
        - button "Reportes" [ref=e51] [cursor=pointer]:
          - img [ref=e53]
          - text: Reportes
      - generic [ref=e57]:
        - button "Cerrar Sesión" [ref=e58] [cursor=pointer]:
          - img [ref=e59]
          - text: Cerrar Sesión
        - generic [ref=e62]: v1.0.0 — Proyecto Calidad de Software
    - generic [ref=e63]:
      - banner [ref=e64]:
        - heading "Dashboard" [level=1] [ref=e65]
        - generic [ref=e66]: lunes, 20 de jul. de 2026, 09:55:18 p. m.
      - generic [ref=e68]:
        - generic [ref=e69]:
          - article [ref=e70]:
            - img [ref=e72]
            - strong [ref=e77]: "7"
            - generic [ref=e78]: Empleados
          - article [ref=e79]:
            - img [ref=e81]
            - strong [ref=e84]: "2"
            - generic [ref=e85]: Turnos
          - article [ref=e86]:
            - img [ref=e88]
            - strong [ref=e90]: "4"
            - generic [ref=e91]: Asistencias
          - article [ref=e92]:
            - img [ref=e94]
            - strong [ref=e96]: "2"
            - generic [ref=e97]: Tardanzas
        - generic [ref=e98]:
          - heading "Uso rapido" [level=2] [ref=e99]
          - generic [ref=e100]:
            - generic [ref=e101]:
              - generic [ref=e102]: "1"
              - generic [ref=e103]: Registra empleados y turnos de trabajo.
            - generic [ref=e104]:
              - generic [ref=e105]: "2"
              - generic [ref=e106]: Captura la asistencia diaria de cada empleado.
            - generic [ref=e107]:
              - generic [ref=e108]: "3"
              - generic [ref=e109]: Consulta listados y aplica filtros.
            - generic [ref=e110]:
              - generic [ref=e111]: "4"
              - generic [ref=e112]: Revisa reportes de puntualidad y tardanza.
        - generic [ref=e113]:
          - generic [ref=e114]:
            - generic [ref=e116]:
              - heading "Resumen actual" [level=2] [ref=e117]
              - paragraph [ref=e118]: Datos cargados en el sistema
            - generic [ref=e119]:
              - generic [ref=e120]:
                - text: Registros totales
                - generic [ref=e121]: "4"
              - generic [ref=e122]:
                - text: Puntuales
                - generic [ref=e123]: "2"
              - generic [ref=e124]:
                - text: Tardios
                - generic [ref=e125]: "2"
              - generic [ref=e126]:
                - text: Min. de tardanza
                - generic [ref=e127]: "841"
            - generic [ref=e128]:
              - heading "Tasa de puntualidad" [level=3] [ref=e129]
              - generic [ref=e132]:
                - generic [ref=e133]: 50% puntual
                - generic [ref=e134]: 50% tardanza
          - generic [ref=e135]:
            - img [ref=e137]
            - heading "Control de Asistencia" [level=2] [ref=e140]
            - paragraph [ref=e141]: Registra empleados, turnos y asistencia. El sistema calcula automaticamente las tardanzas.
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
  27 |     // 8. El robot verifica que el sistema devuelva una respuesta (Toast de éxito o advertencia de duplicado)
  28 |     await expect(page.locator('.kiosk-status')).toBeVisible();
  29 | 
  30 |     // 9. El robot vuelve al login forzando la recarga para limpiar el estado
  31 |     await page.goto('/login');
  32 |     await page.waitForLoadState('networkidle');
  33 | 
  34 |     // 10. Ahora el robot inicia sesión como Administrador
  35 |     await page.getByText('Dueño Admin').click();
  36 |     await page.getByRole('button', { name: /Iniciar sesión/i }).click();
  37 |     await expect(page).toHaveURL(/.*\/admin/, { timeout: 10000 });
  38 | 
  39 |     // 11. El robot navega a la pestaña de "Asistencias" en el Dashboard (buscando el enlace de Sidebar)
> 40 |     await page.getByRole('link', { name: /Asistencias/i }).click();
     |                                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  41 | 
  42 |     // 12. Verifica visualmente que los datos estén en la tabla
  43 |     await expect(page.getByText('EMP-001').first()).toBeVisible({ timeout: 10000 });
  44 |   });
  45 | });
  46 | 
```