# Guion de Sustentación - Proyecto AsistControl

> [!info] Información General
> **Autor:** Llocclla Sauñe Luis Gerardo
> **Materia:** Pruebas y Aseguramiento de Calidad de Software
> **Tiempo estimado:** 8 - 10 minutos
> **Recomendación:** Habla pausado, mantén contacto visual y apóyate en las métricas de la pantalla.

---

## 1. Portada
> [!abstract] Acción: Mostrar la primera diapositiva (Título)

"Buenos días a todos los miembros del jurado y docentes presentes. Soy Luis Gerardo Llocclla Sauñe, y hoy presento ante ustedes la sustentación de mi proyecto final: **AsistControl**. Este proyecto consiste en un sistema web integral, diseñado específicamente para el control automatizado y auditable de asistencia y retardos de personal."

---

## 2. Planteamiento del Problema
> [!abstract] Acción: Avanzar a "Planteamiento del Problema"

"El desarrollo de este sistema nace de una necesidad operativa real. En muchas organizaciones, el control de asistencia aún se gestiona mediante hojas de cálculo o formatos físicos. Esto presenta tres vulnerabilidades críticas:
1. **Falta de trazabilidad:** Es imposible auditar quién marcó asistencia en tiempo real.
2. **Fricción operativa:** Recursos Humanos invierte horas consolidando cálculos manuales a fin de mes.
3. **Datos inconsistentes:** Las hojas de cálculo son altamente susceptibles a errores u omisiones humanas.
Todo esto se traduce en una pérdida de confiabilidad en los reportes, lo que motivó el desarrollo de una solución de software que automatice estas tareas con precisión matemática."

---

## 3. Objetivos del Sistema
> [!abstract] Acción: Avanzar a "Objetivos del Sistema"

"Para resolver esta problemática, establecimos un objetivo general claro: desarrollar una plataforma centralizada y altamente auditable, garantizando su estabilidad a través de estándares de calidad de software.
Específicamente nos propusimos implementar una arquitectura web para registros rápidos, diseñar un modelo relacional de datos íntegro, y lo más relevante: **blindar el motor de cálculo mediante pruebas automatizadas**."

---

## 4. Metodología de Ingeniería
> [!abstract] Acción: Avanzar a "Metodología de Ingeniería"

"Para garantizar un producto fiable, evitamos la improvisación en el código. El desarrollo se rigió bajo **Specification-Driven Development (SDD)**; es decir, todo requerimiento se tradujo en una regla de negocio y en un test antes de escribir código.
A nivel de gestión, orquestamos el ciclo de vida mediante el **Marco Ágil Scrum**, estructurando entregables en cuatro Sprints que nos permitieron pasar del modelo de datos a un MVP completamente funcional y evaluable."

---

## 5. Arquitectura de Base de Datos
> [!abstract] Acción: Avanzar a "Arquitectura de Base de Datos"

"La base de la solución recae sobre un modelo relacional estricto alojado en **PostgreSQL** a través de Supabase. El núcleo opera sobre cuatro entidades: Empleados, Turnos, Registros transaccionales y Roles de acceso.
Aplicamos restricciones directas en la base de datos: integridad referencial e índices únicos para prohibir terminantemente que existan marcaciones duplicadas o datos huérfanos que corrompan el historial."

---

## 6. Implementación Tecnológica
> [!abstract] Acción: Avanzar a "Implementación Tecnológica"

"A nivel de arquitectura de software, construí una *Single Page Application* bajo un modelo *Serverless*. 
La interfaz interactiva se apoya en React y Tailwind CSS, mientras que la capa de negocio—donde se calcula la tardanza—opera del lado del servidor utilizando las rutas API de **Next.js**. Además, la integridad de los datos entrantes está resguardada por esquemas de validación de **Zod**, impidiendo inyecciones lógicas."

---

## 7. Aseguramiento de Calidad (QA)
> [!abstract] Acción: Avanzar a "Aseguramiento de Calidad (QA)"

"Este es, sin duda, el pilar técnico del proyecto. Utilizando el framework **Vitest**, logramos una eficacia del **100% en las pruebas unitarias**. Sometimos el algoritmo a evaluaciones matemáticas estrictas, asegurando que el cálculo de tardanzas según el umbral de tolerancia sea exacto, y probamos *Edge Cases*, bloqueando lógicamente intentos de registrar salidas antes que entradas. 
Adicionalmente, superamos pruebas de integración end-to-end contra la base de datos, asegurando la fiabilidad de las respuestas HTTP."

---

## 8. Despliegue y Operación (CI/CD)
> [!abstract] Acción: Avanzar a "Despliegue y Operación (CI/CD)"

"El ecosistema opera actualmente en un entorno de producción real. Establecí un pipeline de integración continua: cada versión en GitHub se despliega automáticamente a través de la infraestructura global de **Vercel**, conectándose de forma segura mediante variables de entorno a nuestra base de datos administrada en **Supabase**."

---

## 9. Interfaces y Resultados (UI)
> [!abstract] Acción: Avanzar a "Interfaces y Resultados (UI)"

"El producto final cumple estrictamente con el ciclo del dato: captura, procesa, persiste y analiza. 
Logramos un 'Kiosko Virtual' seguro y libre de fricción para las marcaciones diarias de los empleados, respaldado por un Dashboard gerencial que transforma instantáneamente esos datos puros en KPIs operativos y de puntualidad, eliminando la necesidad de cálculos manuales."

---

## 10. Conclusiones
> [!abstract] Acción: Avanzar a "Conclusiones"

"Para concluir, este proyecto demuestra empíricamente que la aplicación conjunta de **SDD y Scrum** previene defectos críticos de arquitectura. La validación automatizada probó ser una inversión invaluable, ya que erradica la deuda técnica en algoritmos organizacionales delicados.
AsistControl representa, en definitiva, una solución escalable y de grado corporativo que responde de forma sólida al problema planteado. 

Muchas gracias por su atención, quedo a entera disposición para sus preguntas."
