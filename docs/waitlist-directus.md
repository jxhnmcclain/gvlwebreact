# Listas de espera de GVL

Estado: interfaz y endpoint implementados; falta comprobar una escritura real en Directus de producción.

El widget de Turnstile está en la interfaz, pero la validación de sus tokens en servidor sigue pendiente. John pidió revisar solo la interfaz por ahora. El estado general del sitio está en [estado-sitio-2026-11-07.md](estado-sitio-2026-11-07.md).

## Datos separados

Una colección privada `gvl_waitlist_entries` guarda las tres listas mediante `kind`: `creatives`, `teams`, `academy`. La asesoría individual guarda además `option`: `single` ($65.000 CLP) o `four` ($200.000 CLP). No se cobran pagos ni se crean cuentas. Twenty no recibe datos todavía.

## Configuración en Directus

El cambio de esquema está en `main` del repositorio `jxhnmcclain/gvl-directus-cms`. Su bootstrap repetible crea `gvl_waitlist_entries` y los campos de inscripción. Para el lanzamiento inicial, la política del token de build existente permite crear inscripciones pero no leerlas ni editarlas. Si más adelante se configura `DIRECTUS_WAITLIST_TOKEN`, el bootstrap provisiona una cuenta separada con permiso de solo creación.

Vercel ya tiene `DIRECTUS_PROD_URL`, `DIRECTUS_BUILD_TOKEN`, `DIRECTUS_ACCESS_CLIENT_ID` y `DIRECTUS_ACCESS_CLIENT_SECRET` en Production. El endpoint utiliza el token de build mientras no exista `DIRECTUS_WAITLIST_TOKEN`. El token solo vive en la función del servidor.

## Prueba antes de activar

Enviar una inscripción de prueba desde cada página, comprobar la respuesta HTTP 201 y verificar tres ítems distintos en Directus con `kind`, `option` y `consent_at` correctos. Probar también un fallo de almacenamiento: la interfaz debe mostrar error y no afirmar que la inscripción se guardó. Una vez validado, se puede conectar cada `kind` a un flujo distinto de Twenty por n8n, sin cambiar el formulario.
