---
version: 1.0.0
estado: aprobado
titulo: Mapa de desarrollo MVP — Guía del orquestador
autor: [tu nombre]
fecha: [fecha de creación]
---
# Mapa de desarrollo MVP
## Guía del orquestador — del problema al despliegue

> Este documento no es una plantilla a llenar.
> Es el mapa que el orquestador consulta antes y durante
> la construcción de cualquier MVP. Define qué debe existir
> en cada documento, por qué existe, cómo se construye,
> qué relaciones tiene con los demás y cómo se sabe
> que está correctamente cerrado antes de avanzar.
>
> Regla fundamental: ningún documento puede iniciarse
> sin que el anterior esté aprobado. El código no se
> escribe hasta que los 6 documentos estén cerrados.

---

## Principio central del orquestador

El orquestador no es quien escribe el código.
Es quien toma las decisiones que hacen que el código
sea inevitable. Cada documento es una etapa de pensamiento
que reduce ambigüedad. Cuando los 6 están cerrados,
el constructor IA no interpreta — ejecuta.

---

## Flujo de dependencias

DOC-1-PRD → DOC-2-TRD → DOC-3-UI/UX → DOC-4-AppFlow → DOC-5-Backend → DOC-6-Plan → DOC-7-Ejecución

Ningún documento se inicia sin el anterior aprobado.
Un documento aprobado solo se reabre si un documento
posterior detecta una contradicción que obliga a revisarlo.

---

## Convención de estados

| Estado | Significado |
|---|---|
| `abierto` | Documento iniciado — en construcción activa |
| `en-revision` | Contenido completo — bajo revisión del orquestador |
| `aprobado` | Cerrado y validado — habilita el siguiente documento |
| `bloqueado` | No puede avanzar — depende de decisión pendiente |
| `reabierto` | Documento previo que requiere ajuste por hallazgo posterior |

---

## Metadatos mínimos por documento

Todo documento del proyecto debe incluir este encabezado:

    ---
    version: 0.1.0
    estado: abierto
    doc: DOC-N
    titulo: [nombre del documento]
    autor: [nombre]
    fecha: [fecha]
    depende-de: DOC-N-1
    habilita: DOC-N+1
    aprobado: false
    ---

La versión sigue el formato MAYOR.MENOR.PARCHE.
Se incrementa MENOR con cada sección completada.
Se incrementa MAYOR cuando el documento pasa a aprobado.
PARCHE para correcciones menores sin cambio de contenido.

---
## Cierre del mapa de desarrollo MVP

### Sobre este documento

Este mapa no es una metodología rígida.
Es un sistema de criterio para el orquestador.
Su valor no está en seguirlo mecánicamente
sino en entender por qué cada documento existe
y qué pasa cuando se omite o se cierra mal.

Un orquestador que comprende el mapa
puede adaptarlo a cualquier proyecto.
Un orquestador que solo lo sigue
se pierde en el primer proyecto que no encaja
exactamente con lo previsto.

---

### Qué invalida un documento aprobado

Un documento aprobado se reabre cuando:

- Un documento posterior encuentra una contradicción
  que no puede resolverse sin modificar el anterior
- El problema real del negocio cambia de manera
  que invalida decisiones ya tomadas
- Una restricción externa nueva — legal, técnica
  o de negocio — contradice lo aprobado
- El orquestador descubre durante la construcción
  que una decisión del documento no era correcta

Cuando un documento se reabre todos los documentos
posteriores quedan en estado bloqueado hasta
que el documento reabierto vuelva a aprobarse.
El DOC-7 vuelve a estado bloqueado sin excepción.

---

### Protocolo de actualización del mapa

Este documento se actualiza cuando:

- Una decisión tecnológica nueva se vuelve
  relevante para el contexto del MVP
- Una plataforma de despliegue o herramienta
  de construcción cambia significativamente
- El orquestador identifica un patrón de error
  recurrente que este mapa no anticipa
- Un proyecto real revela un vacío en alguna
  sección que causó problemas durante la construcción

Cada actualización incrementa la versión menor
del documento — MAYOR.MENOR.PARCHE — y registra
qué cambió y por qué en el historial de versiones.

---

### Referencia rápida del orquestador

Antes de iniciar cualquier proyecto nuevo:

    ¿Tengo el PRD aprobado?
    Si no → no inicies el TRD

    ¿Tengo el TRD aprobado?
    Si no → no inicies el UI/UX

    ¿Tengo el UI/UX aprobado?
    Si no → no inicies el AppFlow

    ¿Tengo el AppFlow aprobado?
    Si no → no inicies el Backend

    ¿Tengo el Backend aprobado?
    Si no → no inicies el Plan

    ¿Tengo el Plan aprobado?
    Si no → no inicies el Documento de Ejecución

    ¿Tengo los 6 documentos aprobados?
    Si no → no le des instrucción al constructor IA

    ¿Los 6 documentos están aprobados?
    Entonces construye — el código
    es la consecuencia inevitable
    de las decisiones ya tomadas.
