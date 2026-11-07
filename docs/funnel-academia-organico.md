# Funnel orgánico de la academia — piloto de dos semanas

Estado: **propuesta editorial y de medición**, 2026-11-07. No hay publicaciones programadas ni automatizaciones activadas por este documento.

## Qué sabemos y qué cambió

- La [estrategia John × GVL, v1.0](https://docs.google.com/document/d/16I9gpaz0XqiINjMALWvvecIEfVGSiVc2RacoXtPy4og/edit) distingue la voz personal que descubre, prueba y enseña del estudio que aloja el producto. Propone LinkedIn personal como canal principal y videos cortos para Instagram; esa distribución era una propuesta, no una cuota aprobada.
- El [programa del curso, v1.0](https://docs.google.com/document/d/1fTPHztZB3wYgEjrDgFYce9oXrTB0uqBGPTDYwMdef1E/edit) define un producto en construcción: tres niveles, proyectos propios, texto primero y videos progresivos. El nombre «De cero a deploy» es provisional.
- John eligió el **Instagram personal** como origen principal para el contenido educativo que lleve a la lista. LinkedIn personal y X se prueban con papeles distintos; no se presupone el tamaño ni la actividad de esas audiencias.
- `/academia` explica el curso y ofrece una lista de espera. `/academia/diagnostico` añade un recorrido con resultado y ejercicio antes de pedir correo; su implementación y límites están en [onboarding-diagnostico-academia.md](onboarding-diagnostico-academia.md). La web envía UTM a `/api/waitlist` y tiene una etiqueta de GA4. Una escritura real en Directus de producción sigue sin comprobarse. El nuevo evento `academy_waitlist_success` está en código, pero aún no se ha observado en GA4.
- Los planes editoriales anteriores de `projects/direccion-creativa-ia` son historial de trabajo; su calendario y sus borradores no se tratan como publicaciones aprobadas.

## Recorrido propuesto

**Demostración o explicación útil → diagnóstico en `/academia/diagnostico` o lectura del curso en `/academia` → resultado y ejercicio → lista de espera → aviso sobre el curso cuando exista una novedad real.**

Cada publicación debe enseñar algo completo aunque la persona no haga clic. Reservar el enlace para piezas relacionadas con construir herramientas, aprender a probarlas o publicar una app. La serie cultural «Archivos de Internet» puede crear afinidad sin acabar siempre en una invitación al curso.

| Canal | Papel en este piloto | Pieza fuente y salida hacia la landing |
|---|---|---|
| Instagram personal | Mostrar el resultado y despertar la pregunta «¿cómo lo hiciste?» | Reel breve con una captura real del proceso y una decisión concreta. Historia posterior con enlace a `/academia/diagnostico` y enlace estable en el perfil si la prueba en teléfono resulta bien. Comprobar ambos enlaces desde la app antes de publicarlos. Meta documenta el [sticker de enlace en Stories](https://about.fb.com/ja/news/2021/10/linkaccessstickers/). |
| LinkedIn personal | Explicar el criterio y atraer preguntas de diseñadores, creativos y personas de marketing | Un post con problema, captura o demo, decisión y límite de lo construido. Enlace directo a la landing cuando la pieza trate del curso. LinkedIn permite [compartir enlaces en publicaciones](https://www.linkedin.com/help/linkedin/answer/a525301/sharing-articles-or-links?lang=en). No depender de un botón personalizado de perfil, que [requiere ciertos planes Premium](https://www.linkedin.com/help/linkedin/answer/a722888). |
| X personal | Probar conversación con gente que construye y comparte herramientas | Notas cortas del proceso, una captura y respuestas a dudas. Enlace directo solo en las piezas pertinentes; el [perfil admite un sitio web y un post fijado](https://help.x.com/en/managing-your-account/how-to-customize-your-profile). Es un experimento secundario, no una cuota semanal. |

## Primer piloto

1. **Antes de publicar CTA:** enviar una inscripción propia con UTM de prueba, recibir HTTP 201 y comprobar el registro correspondiente en Directus. Validar Turnstile en servidor y probar el formulario desde el navegador de Instagram del teléfono. Registrar el resultado. Una respuesta visual de éxito sin registro observado no cierra esta prueba.
2. **Semana 1:** elegir un artefacto pequeño que John haya construido y pueda mostrar. De una misma captura o grabación salen un Reel visual, una explicación de la decisión en LinkedIn y, si hay una observación útil, una nota en X. Cada versión responde a una pregunta distinta; no se copia el mismo texto tres veces.
3. **Semana 2:** mostrar el siguiente paso real del proyecto: una corrección, un problema de datos o una publicación, según lo que efectivamente se haya hecho. Repetir el enlace en una historia de Instagram y en las piezas de LinkedIn/X donde el curso sea una continuación natural.
4. **Revisión:** comparar visitas etiquetadas, registros observados y preguntas recibidas. Si hay visitas pero pocas inscripciones, revisar claridad de la landing y fricción del formulario. Si casi nadie visita, revisar la pieza y la invitación antes de construir otra página.

Un CTA compatible con el estado actual: «Estoy construyendo un curso para que creativos creen sus propias herramientas con IA. Puedes ver el recorrido y dejar tu correo para recibir novedades». Evitar «inscríbete al curso», «reserva tu cupo» o una fecha de lanzamiento hasta que exista esa oferta.

## Enlaces y medición

Usar un enlace directo a la landing por ubicación. Mantener minúsculas y los mismos nombres durante el piloto. `utm_medium=social` permite clasificar el tráfico orgánico social en GA4 según sus [reglas actuales](https://support.google.com/analytics/answer/9756891/ga4-agrupaciones-de-canales-predeterminadas); Google recomienda `utm_source`, `utm_medium` y `utm_campaign` para las [URL de campaña](https://support.google.com/analytics/answer/10917952).

| Ubicación | Enlace propuesto |
|---|---|
| Bio de Instagram personal | `https://www.growthvideolab.com/academia/diagnostico?utm_source=instagram&utm_medium=social&utm_campaign=academia_waitlist&utm_content=bio_personal` |
| Historia de Instagram | `https://www.growthvideolab.com/academia/diagnostico?utm_source=instagram&utm_medium=social&utm_campaign=academia_waitlist&utm_content=story_demo_01` |
| Post de LinkedIn personal | `https://www.growthvideolab.com/academia?utm_source=linkedin&utm_medium=social&utm_campaign=academia_waitlist&utm_content=post_demo_01` |
| Post de X | `https://www.growthvideolab.com/academia?utm_source=x&utm_medium=social&utm_campaign=academia_waitlist&utm_content=post_demo_01` |

`utm_content` cambia por pieza o ubicación; el resto se mantiene. Registrar URL, fecha, pieza y capturas de resultados en un único tablero. **Registro confirmado** significa ítem observado en Directus, no clic, envío intentado ni evento automático `form_submit`: GA4 puede medir esa interacción sin demostrar que el servidor guardó los datos. Cuando el flujo funcione, añadir un evento de éxito que se emita únicamente tras la respuesta HTTP 201 y comprobarlo con una inscripción de prueba.

La lista de academia ahora describe avisos del curso y material educativo relacionado. Esto no autoriza campañas de servicios ni convierte automáticamente consultas de otros formularios en suscriptores. Antes de enviar correos, verificar el guardado del permiso y una baja operativa. Si el público pide un recurso gratuito, escoger **uno** que ya exista y funcione antes de crear un segundo paso en el funnel.

## Pendientes antes de escalar tráfico

- Comprobar el bootstrap de `gvl_waitlist_entries` y tres escrituras reales, una por tipo de lista. La prueba de la academia debe conservar el UTM de origen.
- Configurar y probar la validación de Turnstile en servidor. John había pedido revisar solo la interfaz en la fase anterior; esto sigue abierto.
- Verificar la experiencia en el navegador interno de Instagram y en un navegador normal. El Security Checkpoint de Vercel ha impedido algunas pruebas automáticas externas.
- Medir un éxito real de lista de espera y comprobar que el diagnóstico guardó respuestas, ejercicio, nivel y UTM en el campo privado `detail`. La lista directa de `/academia` seguirá siendo una entrada más corta.
- Confirmar qué cuentas de LinkedIn y X se usarán y si tienen acceso a las opciones de perfil mencionadas. No hay datos de audiencia ni conversiones para asignarles una cuota de publicaciones.
