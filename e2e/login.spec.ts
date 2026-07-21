import { test, expect } from '@playwright/test';

test.describe('Autenticación y Kiosko (E2E QA)', () => {
  test('Simula el flujo completo de marcación de un empleado', async ({ page }) => {
    // 1. Navegar a la página de inicio de sesión
    await page.goto('/login');

    // 2. Verificar que los elementos visuales críticos estén presentes
    await expect(page.locator('h1.auth-title')).toContainText('AsistControl');

    // 3. Robot hace clic en la tarjeta de demostración de "Ana"
    // Buscamos cualquier elemento que contenga "Ana" en el texto
    await page.getByText('Ana (EMP-001)').click();

    // 4. Robot hace clic en el botón de submit
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();

    // 5. Verificamos que el sistema haga la redirección correctamente hacia la ruta de empleado
    await expect(page).toHaveURL(/.*\/empleado/, { timeout: 5000 });

    // 6. Validamos que la pantalla de Kiosko esté cargada para este usuario
    await expect(page.getByText('EMP-001')).toBeVisible();
  });
});
