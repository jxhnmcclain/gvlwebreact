# Estado del sitio GVL — 2026-11-07

## Interfaz

- El reposicionamiento editorial, las páginas de asesorías y academia, y la landing de marketing para marcas están implementados.
- El menú móvil usa un control visible en la portada, un botón de cierre de tamaño táctil y una entrada animada. Respeta la preferencia del sistema de reducir movimiento.
- Las entradas anteriores de marketing, webs y contenido siguen disponibles.

## Pendientes funcionales

| Tema | Estado comprobado | Para cerrarlo |
|---|---|---|
| Listas de espera en Directus | Existe el endpoint web y el bootstrap de la colección `gvl_waitlist_entries` fue enviado al repositorio del CMS. No se ha comprobado una escritura en producción. | Verificar que Dokploy ejecutó el bootstrap; enviar una prueba por cada lista y comprobar sus registros y campos en Directus. |
| Turnstile en formularios | Los widgets del cliente están presentes. Falta la validación del token en servidor; John pidió revisar solo la interfaz por ahora. | Configurar `TURNSTILE_SECRET_KEY` como secreto de producción y validar cada token con Siteverify antes de procesar los formularios. |
| Formularios de contacto y recursos | La interfaz muestra error cuando falla la solicitud. No hay prueba confirmada de entrega completa a los webhooks de n8n y al destino final. | Probar cada formulario en producción y verificar recepción en el sistema correspondiente. |
| Contenido desde Directus | El build de producción registró `404 Route /gvl-published-feed doesn't exist` y utilizó el snapshot revisado. | Revisar la ruta o extensión del feed en Directus y confirmar una sincronización exitosa sin fallback. |
| Prueba pública automatizada | La solicitud externa al dominio recibió un Security Checkpoint 429 de Vercel. Las rutas se comprobaron localmente y el despliegue anterior estaba READY en Vercel. | Hacer una prueba manual desde navegador normal y repetir las pruebas de envío cuando la protección permita llegar a la función. |
| Twenty | No hay sincronización de inscripciones implementada. | Después de confirmar el guardado en Directus, definir el mapeo y automatización por tipo de lista. |

No se deben presentar las listas como funcionalmente verificadas hasta comprobar sus registros en Directus. No colocar claves en el repositorio ni en documentación.
