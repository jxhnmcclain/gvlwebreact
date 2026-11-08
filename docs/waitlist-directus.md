# Listas de espera de GVL

Estado al 2026-11-08: una inscripción desde el navegador mostró confirmación y John verificó su fila en `gvl_waitlist_entries` de Directus de producción. Quedan por probar las demás variantes de formulario; no se ha comprobado la entrega a Twenty.

El widget de Turnstile está en la interfaz. `/api/waitlist` puede validar tokens con Siteverify cuando se configure `TURNSTILE_SECRET_KEY`; esa variable seguía ausente en Vercel Production el 2026-11-08, por lo que la validación real sigue pendiente. El estado general anterior del sitio está en [estado-sitio-2026-11-07.md](estado-sitio-2026-11-07.md).

## Datos separados

Una colección privada `gvl_waitlist_entries` guarda las tres listas mediante `kind`: `creatives`, `teams`, `academy`. La asesoría individual guarda además `option`: `single` ($65.000 CLP) o `four` ($200.000 CLP). No se cobran pagos ni se crean cuentas. Twenty no recibe datos todavía.

El diagnóstico `/academia/diagnostico` usa `kind=academy` y guarda una representación compacta del nivel, ejercicio, respuestas y versión del permiso en el campo privado `detail` (máximo 1000 caracteres). La lista directa de `/academia` marca su origen como `academy_landing` en ese mismo campo. Esto evita una migración de CMS para el primer corte, pero requiere comprobar un ítem real antes de usar esos datos para segmentación.

## Configuración en Directus

El cambio de esquema está en `main` del repositorio `jxhnmcclain/gvl-directus-cms`. Su bootstrap repetible crea `gvl_waitlist_entries` y los campos de inscripción. Para el lanzamiento inicial, la política del token de build existente permite crear inscripciones pero no leerlas ni editarlas. Si más adelante se configura `DIRECTUS_WAITLIST_TOKEN`, el bootstrap provisiona una cuenta separada con permiso de solo creación.

Vercel ya tiene `DIRECTUS_PROD_URL`, `DIRECTUS_BUILD_TOKEN`, `DIRECTUS_ACCESS_CLIENT_ID` y `DIRECTUS_ACCESS_CLIENT_SECRET` en Production. El endpoint utiliza el token de build mientras no exista `DIRECTUS_WAITLIST_TOKEN`. El token solo vive en la función del servidor.

El 2026-11-08, Directus rechazó las inscripciones con `401 INVALID_CREDENTIALS`: el token recibido por Vercel no coincidía con el que `init` había configurado en Directus. Se alinearon las credenciales y una inscripción se guardó. En el editor de entorno de Dokploy, que escribe un archivo `.env` para Docker Compose, los valores con `$` deben ir entre comillas simples para conservarse literalmente. El token usado durante la reparación se compartió en la conversación; rotarlo en Dokploy y Vercel queda pendiente. No copiar su valor a la documentación.

## Prueba antes de activar

Repetir la prueba desde cada variante aún no comprobada, verificar la respuesta HTTP 201 y revisar en Directus `kind`, `option` y `consent_at`. Probar también un fallo de almacenamiento: la interfaz debe mostrar error y no afirmar que la inscripción se guardó. Una vez validadas las variantes y Siteverify, se puede conectar cada `kind` a un flujo distinto de Twenty por n8n, sin cambiar el formulario.
