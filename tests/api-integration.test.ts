import { describe, it, expect, vi } from 'vitest';
import { GET as getEmployees, POST as createEmployee } from '../src/app/api/employees/route';

// Mapeamos el entorno de pruebas para asegurarnos de que use JSON local (para que las pruebas sean robustas y no requieran BD real)
vi.mock('../src/lib/supabase', () => ({
  hasSupabaseCredentials: () => false,
}));

describe('Integration Tests - Employees API', () => {
  it('GET /api/employees should return a list of employees', async () => {
    // Simulamos un Request HTTP a nuestra API de empleados
    const request = new Request('http://localhost/api/employees', {
      method: 'GET',
    });

    // Invocamos el handler del App Router
    const response = await getEmployees(request);
    
    // Verificamos el estado
    expect(response.status).toBe(200);

    // Parseamos la respuesta
    const data = await response.json();
    
    // Verificamos el contenido (integra la capa de API con la capa de datos/repositorio)
    expect(Array.isArray(data)).toBe(true);
    
    // Si hay datos en el fallback local, validamos su estructura
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('fullName');
      expect(data[0]).toHaveProperty('employeeCode');
    }
  });

  it('POST /api/employees should create a new employee and return success', async () => {
    const newEmployee = {
      fullName: 'John Doe Test',
      employeeCode: 'JD-999',
      email: 'johndoe@test.com',
      roleId: 1,
    };

    // Simulamos un POST Request
    const request = new Request('http://localhost/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    const response = await createEmployee(request);
    
    // Validamos que se insertó correctamente
    expect(response.status).toBe(201);
    
    const result = await response.json();
    expect(result).toHaveProperty('success', true);
  });
});
