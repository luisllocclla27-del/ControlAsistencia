## §3 DOC-3 — Diseño UI/UX

### Propósito
Establece cómo se ve y cómo se siente usar la aplicación para empleados y administradores.

---

### Metadatos que debe llevar

    ---
    version: 2.0.1
    estado: cerrado
    doc: DOC-3-UI-UX
    titulo: UI/UX Specification
    autor: Luis
    fecha: 2026-06-18
    depende-de: DOC-1, DOC-2
    habilita: DOC-4-AppFlow
    aprobado: true
    ---

---

### 3.1 Principios de Experiencia

1. **Fricción Cero en Kiosko:** Un empleado debe ver una pantalla enorme con solo un campo de texto y un teclado numérico grande si es posible. No debe haber menús ni distracciones.
2. **Claridad Administrativa:** El dashboard de reportes debe destacar en rojo a los empleados con retardos o ausencias.

---

### 3.2 Paleta de Colores (Tailwind)

- **Fondo General:** Neutral `bg-slate-50`.
- **Acción Principal:** Azul moderno `bg-blue-600` para botones de "Marcar".
- **Éxito (Puntual):** Verde `bg-green-500` / `text-green-700`.
- **Peligro/Retardo:** Rojo `bg-red-500` / `text-red-700`.

---

### 3.3 Tipografía

- **Global:** Inter (sans-serif) para legibilidad moderna.
- **Títulos:** Bold 2xl/3xl para destacar información importante.

---

### 3.4 Pantallas Principales (Mockups Conceptuales)

**1. Kiosko de Marcación**
- Título centralizado: "Registro de Asistencia"
- Reloj en tiempo real.
- Input grande para "Código de Empleado".
- Botón masivo "Registrar".
- Modal temporal de "Registro Exitoso / Llegada Tarde".

**2. Dashboard de Reportes (Admin)**
- Barra lateral de navegación.
- Tarjetas de resumen en la parte superior: "Total Empleados", "Llegadas Tarde Hoy".
- Tabla de datos ordenable por fecha y tardanza.