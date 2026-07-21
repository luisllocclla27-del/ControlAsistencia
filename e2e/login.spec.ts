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

    // 7. El robot hace clic en "Marcar Entrada"
    await page.getByRole('button', { name: /Marcar Entrada/i }).click();

    // 8. El robot verifica que el sistema devuelva una respuesta (Toast de éxito o advertencia de duplicado)
    await expect(page.locator('.kiosk-status')).toBeVisible();

    // 8.5 El robot hace clic en "Marcar Salida"
    await page.getByRole('button', { name: /Marcar Salida/i }).click();
    await expect(page.locator('.kiosk-status')).toBeVisible();

    // 9. El robot vuelve al login forzando la recarga para limpiar el estado
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // 10. Ahora el robot inicia sesión como Administrador
    await page.getByText('Dueño Admin').click();
    await page.getByRole('button', { name: /Iniciar sesión/i }).click();
    await expect(page).toHaveURL(/.*\/admin/, { timeout: 10000 });

    // 11. El robot navega a la pestaña de "Asistencia" en el Dashboard
    await page.getByRole('button', { name: /Asistencia/i }).click();

    // 12. Verifica visualmente que los datos estén en la tabla
    await expect(page.getByText('EMP-001').first()).toBeVisible({ timeout: 10000 });
  });
});
