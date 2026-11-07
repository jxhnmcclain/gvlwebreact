# Estado del sitio GVL — 2026-11-07

## Interfaz

- El reposicionamiento editorial, las páginas de asesorías y academia, y la landing de marketing para marcas están implementados.
- `/academia` explica el recorrido previsto de tres niveles, la metodología con proyectos propios y el estado de desarrollo. Fuente editorial: [documento maestro del curso, v1.0, 2026-11-07](https://docs.google.com/document/d/1fTPHztZB3wYgEjrDgFYce9oXrTB0uqBGPTDYwMdef1E/edit). El nombre «De cero a deploy», el temario detallado y las herramientas siguen sujetos a revisión durante el desarrollo.
- `/academia/diagnostico` está construido y probado localmente como onboarding de diez u once preguntas según la ruta, resultado inmediato y ejercicio según objetivo y nivel. [Diseño, reglas y pruebas](onboarding-diagnostico-academia.md). El formulario de la lista aún necesita prueba real de guardado; la interfaz no equivale a una inscripción verificada.
- El menú móvil usa un control visible en la portada, un botón de cierre de tamaño táctil y una entrada animada. El acceso «Login / Academia» dentro del menú tiene botón destacado y aclara que conduce a una lista de espera. Las animaciones respetan la preferencia del sistema de reducir movimiento.
- Las entradas anteriores de marketing, webs y contenido siguen disponibles.

## Pendientes funcionales

| Tema | Estado comprobado | Para cerrarlo |
|---|---|---|
| Listas de espera en Directus | Existe el endpoint web y el bootstrap de la colección `gvl_waitlist_entries` fue enviado al repositorio del CMS. No se ha comprobado una escritura en producción. | Verificar que Dokploy ejecutó el bootstrap; enviar una prueba por cada lista y comprobar sus registros y campos en Directus. |
| Turnstile en formularios | Los widgets del cliente están presentes. `/api/waitlist` verifica con Siteverify solo cuando `TURNSTILE_SECRET_KEY` existe; esa variable no estaba en Production el 2026-11-07. Los formularios que van directamente a n8n siguen fuera de esta verificación. | Configurar el secreto, comprobar Siteverify con token válido y rechazado, y revisar los flujos de n8n por separado. |
| Formularios de contacto y recursos | La interfaz muestra error cuando falla la solicitud. No hay prueba confirmada de entrega completa a los webhooks de n8n y al destino final. | Probar cada formulario en producción y verificar recepción en el sistema correspondiente. |
| Contenido desde Directus | El build de producción registró `404 Route /gvl-published-feed doesn't exist` y utilizó el snapshot revisado. | Revisar la ruta o extensión del feed en Directus y confirmar una sincronización exitosa sin fallback. |
| Prueba pública automatizada | La solicitud externa al dominio recibió un Security Checkpoint 429 de Vercel. Las rutas se comprobaron localmente y el despliegue anterior estaba READY en Vercel. | Hacer una prueba manual desde navegador normal y repetir las pruebas de envío cuando la protección permita llegar a la función. |
| Twenty | No hay sincronización de inscripciones implementada. | Después de confirmar el guardado en Directus, definir el mapeo y automatización por tipo de lista. |
| Diagnóstico de academia | La ruta y las reglas pasaron build y recorridos locales en móvil y escritorio. El resultado se entrega sin correo; el detalle del diagnóstico usa el campo privado existente de la lista. | Probar la ruta desde el Instagram personal en un teléfono, comprobar envío y registro en Directus, y revisar los ejercicios con usuarios reales. |
| Permiso de marketing en otros formularios | La lista de academia explica que enviaría noticias del curso y material educativo relacionado. Las otras rutas aún no guardan un permiso de marketing separado y comprobado. | Auditar cada destino n8n y añadir una casilla opcional, sin marcar, con registro de consentimiento y baja operativa antes de enviar campañas. |

No se deben presentar las listas como funcionalmente verificadas hasta comprobar sus registros en Directus. No colocar claves en el repositorio ni en documentación.

La propuesta de captación desde Instagram personal, LinkedIn y X está en [funnel-academia-organico.md](funnel-academia-organico.md). Es un piloto editorial; no se han publicado piezas ni activado correos a partir de ese plan.
