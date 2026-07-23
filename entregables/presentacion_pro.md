---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;800&family=Inter:wght@300;400;600&display=swap');

  section {
    background: radial-gradient(circle at 10% 20%, #0f172a 0%, #1e1b4b 100%);
    color: #f8fafc;
    font-family: 'Inter', sans-serif;
    padding: 50px 70px;
    font-size: 22px;
  }
  
  h1, h2, h3 {
    font-family: 'Outfit', sans-serif;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 2.8em;
    font-weight: 800;
    background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-bottom: none;
    line-height: 1.1;
  }
  
  h2 {
    font-size: 1.8em;
    color: #e0e7ff;
    font-weight: 700;
    border-bottom: 2px solid rgba(56, 189, 248, 0.3);
    padding-bottom: 8px;
  }
  
  .highlight {
    color: #38bdf8;
    font-weight: 700;
  }
  
  .subtitle {
    font-size: 1.3em;
    color: #94a3b8;
    font-family: 'Outfit', sans-serif;
    margin-top: -10px;
    margin-bottom: 30px;
  }

  .box {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
  }
  
  ul {
    margin-top: 15px;
  }
  
  ul li {
    margin-bottom: 12px;
    font-size: 1.1em;
    color: #cbd5e1;
    line-height: 1.4;
  }
  
  ul li strong {
    color: #f8fafc;
  }

  .columns {
    display: flex;
    gap: 30px;
    margin-top: 20px;
  }
  
  .column {
    flex: 1;
  }
  
  .tag {
    display: inline-block;
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 0.8em;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    margin-right: 8px;
    margin-bottom: 8px;
    border: 1px solid rgba(56, 189, 248, 0.3);
  }

  .metric {
    text-align: center;
    background: rgba(255, 255, 255, 0.03);
    padding: 15px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .metric-value {
    font-size: 2.5em;
    font-weight: 800;
    color: #38bdf8;
    font-family: 'Outfit', sans-serif;
  }
  
  .metric-label {
    color: #94a3b8;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
---

<!-- class: lead -->

<h1>AsistControl</h1>
<div class="subtitle">Sistema de Control de Asistencia y Retardos</div>

<div class="box">
  <p style="font-size: 1.1em; margin: 0; color: #cbd5e1;">
    <strong>Proyecto Final:</strong> Pruebas y Aseguramiento de Calidad de Software<br>
    <strong>Autor:</strong> Llocclla Sauñe Luis Gerardo<br>
    <strong>Docente:</strong> Zapata Casaverde Richard<br>
    Universidad Nacional de San Cristóbal de Huamanga (2026)
  </p>
</div>

---

<h2>Planteamiento del Problema</h2>

La gestión manual de asistencia mediante hojas de cálculo y formatos físicos presenta vulnerabilidades críticas en entornos organizacionales:

<div class="columns">
  <div class="column">
    <ul>
      <li><strong>Falta de Trazabilidad:</strong> Imposibilidad de auditar marcaciones en tiempo real para la toma de decisiones.</li>
      <li><strong>Fricción Operativa:</strong> Consumo excesivo de tiempo administrativo en la consolidación de nóminas.</li>
      <li><strong>Datos Inconsistentes:</strong> Alta susceptibilidad al error humano, omisiones y alteraciones de información.</li>
    </ul>
  </div>
  <div class="column">
    <div class="box" style="margin-top: 0; border-left: 4px solid #f43f5e;">
      <strong style="color: #f43f5e; font-family: 'Outfit'; font-size: 1.1em;">Impacto Operacional</strong>
      <p style="margin-top: 10px; color: #cbd5e1; font-size: 0.9em;">Disminución de la confiabilidad en los reportes administrativos y pérdida de eficiencia departamental.</p>
    </div>
  </div>
</div>

---

<h2>Objetivos del Sistema</h2>

Desarrollar una solución tecnológica moderna, centralizada y altamente auditable, regida bajo los más altos estándares de calidad de software.

<div class="box">
  <span class="tag">Centralización</span>
  <span class="tag">Automatización</span>
  <span class="tag">Confiabilidad</span>
  
  <ul style="margin-top: 15px; margin-bottom: 0;">
    <li>Implementar una <strong>arquitectura web responsiva</strong> para el registro y monitoreo rápido de asistencia.</li>
    <li>Diseñar un <strong>modelo relacional íntegro</strong> para mapear empleados, turnos y márgenes de tolerancia.</li>
    <li>Asegurar el motor de cálculo matemático mediante una suite de <strong>pruebas automatizadas</strong> rigurosas.</li>
  </ul>
</div>

---

<h2>Metodología de Ingeniería</h2>

El proyecto se estructuró bajo metodologías formales para mitigar riesgos y asegurar la calidad:

<div class="columns">
  <div class="column">
    <div class="box" style="margin-top: 0;">
      <h3 style="font-size: 1.2em; color: #818cf8;">Specification-Driven Development</h3>
      <p style="font-size: 0.9em; color: #cbd5e1;">(SDD) guiando el desarrollo: cada requerimiento se tradujo en una especificación técnica, reglas de negocio y pruebas antes de iniciar la etapa de codificación.</p>
    </div>
  </div>
  <div class="column">
    <div class="box" style="margin-top: 0;">
      <h3 style="font-size: 1.2em; color: #34d399;">Marco Ágil Scrum</h3>
      <p style="font-size: 0.9em; color: #cbd5e1;">El ciclo de vida se dividió en Sprints iterativos, garantizando entregables funcionales, evaluables y desplegados de manera incremental.</p>
    </div>
  </div>
</div>

---

<h2>Arquitectura de Base de Datos</h2>

El ecosistema de datos está alojado en <strong>PostgreSQL (Supabase)</strong> garantizando alta disponibilidad, transaccionalidad e integridad referencial.

<ul>
  <li><code>employees</code>: Identidad y estado del personal (restricciones Unique UUID).</li>
  <li><code>shifts</code>: Horarios parametrizados con umbrales matemáticos de tolerancia.</li>
  <li><code>attendance_records</code>: Entidad transaccional inmutable. Persiste la hora exacta y los minutos calculados de tardanza.</li>
  <li><code>roles</code>: Control de acceso basado en roles (RBAC).</li>
</ul>

<div class="tag" style="margin-top: 10px;">Integridad Referencial (1:N)</div>
<div class="tag">Restricciones de Duplicidad (Constraints)</div>

---

<h2>Implementación Tecnológica</h2>

Arquitectura <strong>Single Page Application (SPA)</strong> desplegada bajo el modelo Serverless, diseñada para alta concurrencia y seguridad.

<div class="columns">
  <div class="column">
    <ul>
      <li><strong>Capa de Presentación (Frontend):</strong> React y Tailwind CSS, priorizando heurísticas de usabilidad y rendimiento.</li>
      <li><strong>Capa de Negocio (Backend):</strong> Next.js API Routes, garantizando que el cálculo de tardanzas se ejecute en un entorno seguro y privado.</li>
      <li><strong>Capa de Validación:</strong> Implementación de Zod Schemas para interceptar cargas de datos inválidas y prevenir inyecciones lógicas.</li>
    </ul>
  </div>
</div>

---

<h2>Aseguramiento de Calidad (QA)</h2>

La validación técnica representa el núcleo de fiabilidad del proyecto. Se implementó <strong>Vitest</strong> para certificar la pureza algorítmica.

<div class="columns">
  <div class="column">
    <div class="metric">
      <div class="metric-value">100%</div>
      <div class="metric-label">Pruebas Unitarias Exitosas</div>
    </div>
    <ul style="font-size: 0.9em; margin-top: 15px;">
      <li>Validación algorítmica de los cálculos de tardanza según tolerancias.</li>
      <li>Comprobación matemática y bloqueos lógicos (Edge Cases).</li>
    </ul>
  </div>
  
  <div class="column">
    <div class="metric">
      <div class="metric-value">API</div>
      <div class="metric-label">Pruebas de Integración</div>
    </div>
    <ul style="font-size: 0.9em; margin-top: 15px;">
      <li>Aserción de persistencia en la base de datos (End-to-End simulation).</li>
      <li>Confirmación de códigos de respuesta HTTP correctos.</li>
    </ul>
  </div>
</div>

---

<h2>Despliegue y Operación (CI/CD)</h2>

El flujo de entrega continua permite auditar y operar el software en tiempo real bajo condiciones de producción.

<div class="box">
  <h3 style="font-size: 1.2em;">Ecosistema de Producción</h3>
  <ul style="margin-top: 10px; font-size: 1em;">
    <li><strong>Vercel:</strong> Orquestación del Build, manejo de certificados SSL y entrega global vía CDN de baja latencia.</li>
    <li><strong>Supabase:</strong> Motor de base de datos administrado, ejecutando nuestros esquemas estructurados y datos semilla (Seed).</li>
    <li><strong>GitHub:</strong> Versionado distribuido, trazando cada commit de manera directa con las versiones desplegadas.</li>
  </ul>
</div>

---

<h2>Interfaces y Resultados (UI)</h2>

Un producto moderno diseñado para minimizar la curva de aprendizaje y fricción operativa:

<ul>
  <li><strong>Kiosko Virtual:</strong> Portal de un solo toque para que los empleados registren sus tiempos de forma inequívoca y sellada.</li>
  <li><strong>Dashboard Analítico:</strong> Cuadros de mando gerenciales, mostrando KPIs de puntualidad y consolidado histórico por turnos.</li>
</ul>

<div class="box" style="border-left: 4px solid #34d399; margin-top: 15px;">
  <p style="margin: 0; color: #e2e8f0; font-size: 1em;">
    El sistema cumple íntegramente con el ciclo de vida del dato: <strong>Captura ➔ Procesa ➔ Persiste ➔ Analiza</strong>.
  </p>
</div>

---

<!-- class: lead -->

<h1 style="font-size: 3.5em; background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%); -webkit-background-clip: text; margin-bottom: 20px;">Conclusiones</h1>

<div class="box" style="text-align: left; margin-top: 20px;">
  <ul style="margin: 0;">
    <li>La aplicación de <strong>SDD y Scrum</strong> fue vital para prevenir defectos de arquitectura antes de iniciar la fase de codificación.</li>
    <li>Las <strong>pruebas automatizadas (QA)</strong> demostraron que la inversión inicial en testing erradica la deuda técnica en algoritmos críticos para la empresa.</li>
    <li>AsistControl representa una <strong>solución de software escalable, de grado corporativo y técnicamente defendible</strong>, cumpliendo los objetivos planteados.</li>
  </ul>
</div>
