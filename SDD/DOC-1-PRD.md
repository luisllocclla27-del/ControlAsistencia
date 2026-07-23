## §1 DOC-1 — PRD (Product Requirements Document)

### Propósito
Define el producto desde la perspectiva del usuario y del negocio.

---

### Metadatos que debe llevar

    ---
    version: 1.0.0
    estado: cerrado
    doc: DOC-1-PRD
    titulo: Product Requirements Document - Sistema de Asistencia
    autor: Luis
    fecha: 2026-07-22
    depende-de: ninguno
    habilita: DOC-2-TRD
    aprobado: true
    ---

---

### 1.1 Problema observado

La falta de un control automatizado, preciso y en tiempo real para el registro de asistencia y retardos de los empleados genera inconsistencias en la nómina, pérdida de tiempo en procesos manuales y dificultad para medir la productividad y puntualidad del personal en la organización.
Los empleados deben marcar su asistencia en hojas o sistemas de firmas que luego RH tiene que procesar a mano.

---

### 1.2 Usuario y contexto real

Tenemos dos tipos de usuarios principales:
1. **El Empleado:**
   - **Contexto:** Llega a su lugar de trabajo y necesita marcar su entrada de forma rápida. No tiene tiempo para sistemas lentos. Necesita un kiosko o portal directo.
2. **El Administrador (Recursos Humanos):**
   - **Contexto:** Necesita consultar reportes a final de mes o quincena. Necesita ver rápidamente quién llegó tarde, quién salió temprano y el total de horas trabajadas.

---

### 1.3 Solución imaginada

> **AsistControl** permite a **los empleados** registrar su entrada y salida de forma rápida mediante un código único para que **Recursos Humanos** obtenga reportes automatizados y precisos de puntualidad.

---

### 1.4 Alcance — MUST · SHOULD · WONT

| Categoría | Funcionalidad |
|---|---|
| `MUST` | Registro de entrada y salida mediante Kiosko digital (código empleado). |
| `MUST` | Panel de administrador para ver registros diarios y generar reportes. |
| `MUST` | Cálculo automático de minutos de retardo y salidas anticipadas. |
| `SHOULD` | Autenticación robusta de administradores (Login). |
| `WONT` | Integración con biométricos (huella o facial) para esta fase. |

---

### 1.5 Criterios de éxito medibles

1. El 100% de los empleados puede marcar asistencia en menos de 10 segundos.
2. El equipo de Recursos Humanos reduce en un 90% el tiempo de cálculo de nómina relacionado a retardos.
3. Precisión del 100% en el cálculo de horas según las pruebas automatizadas del sistema.

---

### 1.6 Criterios de cancelación

El proyecto se detendrá si:
- No se puede asegurar que los datos no puedan ser manipulados por empleados.
- Supabase no garantiza el tiempo de respuesta requerido para evitar cuellos de botella al horario de entrada.
