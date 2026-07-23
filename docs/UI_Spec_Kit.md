# UI Spec Kit (Design System)

Este documento define el **Spec Kit** visual y la guía de estilos (Design System) utilizados para construir la interfaz de usuario de AsistControl, garantizando la consistencia visual (Mobile First) requerida en el Documento de Diseño de Software (SDD).

## 1. Paleta de Colores (Color Tokens)
El sistema utiliza una paleta de modo oscuro basada en los siguientes colores hexadecimales:
- **Background Principal (`--bg-primary`):** `#09090b` (Negro profundo, reduce fatiga visual).
- **Background Secundario (`--bg-card`):** `#18181b` (Gris oscuro para tarjetas y formularios).
- **Acento Primario (`--accent`):** `#6366f1` (Índigo vibrante, usado en botones de acción como "Iniciar sesión").
- **Acento Secundario (`--accent-hover`):** `#4f46e5` (Variación para efectos de hover).
- **Texto Principal (`--text-primary`):** `#fafafa` (Blanco con ligera opacidad para mejor lectura).
- **Texto Muted (`--text-muted`):** `#a1a1aa` (Gris claro para descripciones secundarias).

## 2. Tipografía
- **Fuente Principal:** `Inter` o `system-ui`.
- **Pesos:** Normal (400) para textos descriptivos, Semibold (600) para subtítulos, Bold (700) para Títulos H1 y botones.
- **Jerarquía:**
  - H1 (Títulos de página): `2rem` (32px), Bold.
  - H3 (Títulos de tarjetas): `1.125rem` (18px), Semibold.
  - Texto Normal: `0.875rem` (14px).

## 3. Sistema de Componentes (Component Kit)
### Botones (Buttons)
- **Primary Button:** Fondo `--accent`, texto blanco, bordes redondeados (`border-radius: 8px`), padding `12px 24px`. Efecto hover: transición suave a `--accent-hover`.
- **Card Button (Kiosko):** Tarjetas cuadradas de gran tamaño con iconos SVG centrados. Usados específicamente para pantallas táctiles (Mobile First / Tablets).

### Alertas (Toasts / Status)
- **Toast Success:** Fondo verde esmeralda (`#10b981`), texto blanco. Aparece al registrar asistencia correctamente.
- **Toast Error:** Fondo rojo (`#ef4444`), texto blanco. Aparece en caso de asistencia duplicada o error de servidor.

## 4. Layout (Arquitectura de Interfaz)
- **Grid System:** CSS Grid y Flexbox. 
- La vista de administrador (Dashboard) utiliza una estructura de barra lateral (Sidebar) de `250px` de ancho en escritorio, oculta bajo un menú hamburguesa en móviles.
- El área principal (Main Content) ocupa la fracción de pantalla restante (`1fr`) con `overflow-y: auto`.
