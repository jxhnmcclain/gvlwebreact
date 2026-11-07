# Listas de espera de GVL

Estado: interfaz y endpoint implementados; almacenamiento pendiente de configurar y probar en Directus de producción. No publicar estas páginas como listas operativas hasta completar esta conexión.

## Datos separados

Una colección privada `gvl_waitlist_entries` guarda las tres listas mediante `kind`: `creatives`, `teams`, `academy`. La asesoría individual guarda además `option`: `single` ($65.000 CLP) o `four` ($200.000 CLP). No se cobran pagos ni se crean cuentas. Twenty no recibe datos todavía.

## Configuración en Directus

Crear la colección `gvl_waitlist_entries`, sin acceso público. Campos: `kind`, `option`, `name`, `email`, `detail`, `page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (texto); `consent_at` (fecha y hora). Se puede usar el ID autogenerado por Directus y sus campos de fecha de creación. Dar a un usuario técnico permiso de **crear** ítems en esta colección solamente; emitir un token estático para ese usuario. Restringir lectura y edición a operadores autorizados.

En Vercel, configurar `DIRECTUS_WAITLIST_TOKEN` como secreto de entorno para Production. `DIRECTUS_PROD_URL`, `DIRECTUS_ACCESS_CLIENT_ID` y `DIRECTUS_ACCESS_CLIENT_SECRET` ya existen para la integración editorial; comprobar que también permiten llegar a `/items/gvl_waitlist_entries` desde la función. No usar `DIRECTUS_BUILD_TOKEN` para escrituras.

## Prueba antes de activar

Enviar una inscripción de prueba desde cada página, comprobar la respuesta HTTP 201 y verificar tres ítems distintos en Directus con `kind`, `option` y `consent_at` correctos. Probar también un fallo de almacenamiento: la interfaz debe mostrar error y no afirmar que la inscripción se guardó. Una vez validado, se puede conectar cada `kind` a un flujo distinto de Twenty por n8n, sin cambiar el formulario.
