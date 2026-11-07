# Diagnóstico de entrada a la academia

Estado: **onboarding construido en React y probado localmente; despliegue y guardado real pendientes**, 2026-11-07. Este documento no activa correos ni automatizaciones.

## Decisión de producto propuesta

El diagnóstico sería una entrada alternativa a la landing `/academia`, especialmente para quien llegue desde el Instagram personal. La landing actual seguiría explicando el curso y ofreciendo la lista de espera. El diagnóstico ayudaría a responder «¿por dónde empiezo?» mediante preguntas fáciles sobre una práctica real. No sería un examen, un acceso al curso ni una promesa de mentoría.

«Hablar de ambos» se aplicó como voz educativa en primera persona y Growth Video Lab como estudio que desarrolla la experiencia y gestiona la lista.

## Recorrido, pensado como onboarding de una app

**Entrada implementada:** «Tu siguiente paso para crear con IA». Explica que las respuestas sirven para recomendar un punto de partida y un ejercicio. La pantalla deja claro que el curso sigue en construcción. Botón «Empezar».

El recorrido contiene **nueve preguntas base y dos preguntas técnicas según la experiencia declarada**. La pregunta sobre capacidades se omite cuando la persona aún no ha construido nada: son diez preguntas para ese caso y once para los demás. La cantidad final se muestra cuando la persona declara lo que ya construyó; no se promete un tiempo sin prueba con usuarios. Cada pregunta usa lenguaje de acciones y resultados, con «No lo sé» donde hace falta.

| Paso | Pregunta en pantalla | Respuestas fáciles | Para qué sirve |
|---|---|---|---|
| 1 | ¿A qué te dedicas más hoy? | Diseño / contenido / marketing / otra cosa | Elegir ejemplos cercanos a su trabajo, sin excluir a nadie. |
| 2 | ¿Qué te gustaría construir primero? | Una herramienta para mi trabajo / una automatización / una app / quiero explorar | Elegir una de las doce rutas de ejercicio. |
| 3 | ¿De dónde parte esa idea? | Una tarea que repito / una idea clara / un prototipo / todavía estoy buscando | Ajustar el tamaño del primer paso. |
| 4 | ¿Qué has construido tú hasta ahora? | Nada todavía / un artefacto o automatización / una app en pruebas / una app publicada | Estimar el punto de partida a partir de algo hecho. |
| 5 | ¿Con qué has trabajado más para construir? | Ninguna / chat con IA / Claude Code o Codex / Lovable, v0 o AI Studio / código propio | Escoger una opción; adaptar las instrucciones del ejercicio. |
| 6 | ¿Qué puede hacer tu proyecto hoy? | Muestra una respuesta / recibe datos y devuelve algo / guarda datos o permite que otros lo usen / no estoy seguro | Distinguir idea, prototipo y flujo funcional. Si no hay proyecto, saltar esta pantalla. |
| 7 | ¿Cómo compruebas que funciona? | Aún no lo probé / pruebo un ejemplo / pruebo varios casos / reviso errores y resultados | Proponer una prueba que la persona sí pueda realizar. |
| 8 | ¿Dónde te detienes ahora? | Acotar la idea / construir / conectar herramientas / publicar / datos, usuarios o seguridad | Encontrar el obstáculo que debe resolver el ejercicio. |
| 9 | ¿Cuánto tiempo quieres dedicarle a tu primer intento? | 20 minutos / 45 minutos / un rato largo | Acotar el ejercicio; no usar esta respuesta para etiquetar nivel. |

Después del paso 6 aparecen **dos preguntas técnicas adaptadas**, con un ejemplo breve entre paréntesis cuando sea útil:

| Ruta | Preguntas y respuestas |
|---|---|
| Aún no construye | **¿Puedes decir qué entraría y qué saldría de tu herramienta?** Sí / más o menos / todavía no. **¿Con qué material puedes probarla?** Un texto / una imagen / una tabla / aún no tengo material. |
| Tiene artefacto o prototipo | **¿Dónde quedan los datos al cerrar el proyecto?** No se guardan / en un archivo o planilla / en una base de datos / no lo sé. **¿Otra persona puede probarlo?** Solo en mi equipo / con un enlace de vista previa / con un enlace público / no lo sé. |
| Publicó una app | **¿Tu app usa cuentas o guarda datos de otras personas?** Sí / no / no lo sé. **Cuando falla, ¿cómo te enteras?** Me avisan / veo un error / reviso registros / todavía no tengo forma. |

No preguntar por contraseñas, datos privados, nombre de clientes, ingresos o código. Si una respuesta contradice otra, el resultado explica la duda y propone un ejercicio seguro; no aparenta precisión que el cuestionario no tiene.

## Cómo se forma el resultado

La recomendación será una regla visible, no una puntuación misteriosa. **Nivel 1:** aún no construye un artefacto que haga una tarea. **Nivel 2:** ya hizo un artefacto o prototipo, pero le falta convertirlo en una app con una tarea funcional y un enlace que otra persona pueda abrir. **Nivel 3:** ya publicó una app funcional y quiere trabajar datos, usuarios, seguridad o fiabilidad. Si publicó algo pero el flujo principal todavía falla, recomendar un ejercicio de Nivel 2 y explicar ese criterio.

El resultado presenta el **punto de partida sugerido**, una razón basada en lo que ha construido, un ejercicio con tres pasos y una forma de comprobarlo. Las respuestas sobre actividad, origen de la idea, herramientas, pruebas y bloqueo ajustan las indicaciones. La respuesta sobre tiempo cambia el alcance. Hay que probar la lógica con personas reales antes de llamarla una evaluación validada.

### Banco inicial de ejercicios

Cada combinación de objetivo y nivel tiene un ejercicio propio. El bloqueo elegido determina el primer paso y la herramienta conocida cambia las instrucciones, sin obligar a usar una plataforma particular.

| Quiere construir | Nivel 1 | Nivel 2 | Nivel 3 |
|---|---|---|---|
| Herramienta para su trabajo | Elegir una tarea repetida. Escribir una entrada, una salida esperada y tres ejemplos. Crear un primer artefacto con datos de prueba. | Convertir el artefacto en una interfaz con una entrada y una salida. Probar tres casos y compartir un enlace que abra en otro teléfono. | Agregar guardado o recuperación de un resultado, validar entradas y revisar quién puede verlo. Probar un error y documentar cómo se corrige. |
| Automatización | Dibujar disparador, datos que entran, acción y resultado. Simular tres ejecuciones a mano o con IA antes de conectar servicios. | Conectar dos pasos con datos de prueba. Registrar qué pasó en tres ejecuciones y definir qué hacer si uno falla. | Evitar duplicados, agregar registro de fallos y una forma de reintentar. Probar dos veces la misma entrada y un fallo deliberado. |
| App | Describir una sola tarea que otra persona haría. Crear una pantalla o prototipo que permita recorrerla con datos ficticios. | Construir ese flujo de principio a fin, publicarlo y pedir a otra persona que lo abra y complete la tarea desde el teléfono. | Elegir un dato que la app conserve, definir quién puede verlo y comprobar que una entrada inválida o un acceso indebido no expongan información. |
| Explorar una idea | Anotar tres molestias de su trabajo. Elegir una, describir quién la vive y hacer un boceto o artefacto que muestre una posible respuesta. | Elegir una idea y crear un prototipo de una sola tarea. Compartirlo y registrar tres observaciones de uso antes de agregar funciones. | Elegir la suposición más riesgosa de una idea nueva. Crear una prueba pequeña con datos ficticios y anotar qué ocurrió y qué cambiaría. |

Ejemplo de salida: **«Tu punto de partida: Nivel 2. Ya hiciste un prototipo, pero solo corre en tu equipo. Esta semana conviértelo en una pantalla que reciba un ejemplo real y muestre un resultado. Prueba tres entradas distintas. Compártelo con alguien y comprueba que el enlace abra en su teléfono.»** Debajo se muestra «Ver el recorrido del curso» hacia `/academia#recorrido` y «Recibir novedades del curso» para abrir la lista. El ejercicio permanece visible sin dejar el correo.

## Sensación y móvil

- Una pregunta por pantalla, respuestas grandes y avance por etapas: «Tu idea», «Lo que ya hiciste», «Siguiente paso». La longitud se ajusta a las preguntas condicionales. Se puede volver y cambiar respuestas sin perder el avance. No hay temporizador ni penalización.
- Mantener la identidad actual: crema, negro, amarillo, tipografía y bordes existentes. La recompensa es un mapa concreto de aprendizaje, no puntos o insignias de un curso que aún no opera.
- Respuestas táctiles de al menos 44 px de alto, texto breve, foco y teclado visibles, soporte para lector de pantalla, movimiento reducido y prueba en el navegador interno de Instagram. Evitar que el teclado o Turnstile tapen el CTA.
- Guardar el avance solo en la sesión del navegador hasta que la persona envíe el formulario. No crear cuenta ni perfil silencioso.

## Captura y permisos

El resultado se muestra antes de pedir nombre y correo. Si la persona quiere noticias, el envío lleva `kind=academy`, nivel sugerido, respuestas elegidas, versión de la regla y parámetros UTM. Las respuestas se serializan en el campo privado `detail` ya existente de `gvl_waitlist_entries`, dentro de su límite de 1000 caracteres; no se requiere migración del CMS para este primer corte. El guardado real en Directus sigue sin comprobarse. El resultado no se envía por correo hasta que haya un flujo comprobado.

**Copy propuesto para la lista de la academia:**

> Quiero recibir por correo novedades de este curso en construcción y material educativo relacionado con crear herramientas con IA. Growth Video Lab guardará mi nombre, correo, respuestas y resultado para enviarme estos mensajes. Puedo pedir la baja en hola@growthvideolab.com.

La lista de la academia puede ofrecer esas dos clases de mensajes como una suscripción claramente descrita. Para los formularios de asesoría, contacto, webs, guía y propuestas, recomiendo dos finalidades visibles: el permiso necesario para responder la solicitud concreta y una casilla **separada, desmarcada y opcional** para material educativo, novedades y servicios de Growth Video Lab. Una solicitud comercial debe poder enviarse sin suscribirse al boletín. No usar una casilla obligatoria de marketing general en todos los formularios.

Motivo: la [Ley 21.719](https://www.bcn.cl/leychile/navegar?idNorma=1209272) entra en vigor el 1 de diciembre de 2026 y exige consentimiento libre y específico para cada finalidad; presume que no es libre cuando se exige para prestar un servicio que no necesita ese tratamiento, con una excepción delimitada si el consentimiento es la única contraprestación informada. El [artículo 28 B de la Ley del Consumidor](https://www.sernac.cl/portal/609/w3-propertyvalue-58918.html) exige identificar los correos publicitarios y ofrecer una vía válida para detenerlos. Esta propuesta necesita una política de privacidad accesible, registro de fecha y versión del permiso, y una baja que funcione antes de enviar campañas.

## Implementación y pendientes

- **Hecho en código:** ruta `/academia/diagnostico`; preguntas condicionales, avance en sesión, resultado, doce ejercicios, formulario de academia, UTM, metadatos y enlace desde `/academia`. No hay cuentas, pagos ni LMS.
- **Probado localmente:** build, cinco pruebas de reglas y tres recorridos de navegador a 375 px, 390 px y 1280 px, sin errores de página ni desborde horizontal. El navegador interno de Instagram no se ha probado desde un teléfono real.
- **Pendiente en producción:** comprobar HTTP 201 y el ítem en Directus. El formulario solo muestra éxito después de que `/api/waitlist` responda correctamente. El evento `academy_waitlist_success` se emite solo después de esa respuesta, pero no se ha observado en GA4.
- **Seguridad pendiente:** el widget Turnstile funciona en cliente y `/api/waitlist` ya contiene la llamada a Siteverify cuando existe `TURNSTILE_SECRET_KEY`. El secreto no estaba presente en Vercel Production al revisar sus nombres de variables el 2026-11-07, por lo que la validación de servidor aún no está activa allí. El endpoint mantiene el comportamiento previo hasta configurar el secreto; no presentar el widget como protección completa.
- **Otros formularios:** asesoría, contacto, webs, guía y propuestas utilizan rutas distintas. Aún no se agregó permiso opcional de marketing a esos flujos porque no se ha verificado cómo sus destinos guardan ese campo. Requieren revisión individual antes de activar correos.
- **Posterior:** correo personalizado con ejercicios, baja automatizada, sincronización con Twenty y medición de conversiones reales.
