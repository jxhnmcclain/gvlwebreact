import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const guideSections = [
  ['agentes', '01', 'Chatbot, automatización y agente'],
  ['herramientas', '02', 'Codex, Claude Code y herramientas'],
  ['arquitectura', '03', 'Cómo se conectan las piezas'],
  ['elegir', '04', 'Elegir el primer flujo'],
  ['disenar', '05', 'Diseñar el proceso'],
  ['conectar', '06', 'Conectar tus sistemas'],
  ['rituales', '07', 'Rutinas diarias y mensuales'],
  ['control', '08', 'Permisos y revisión'],
  ['plantilla', '09', 'Plantilla para empezar'],
  ['prueba', '10', 'Probar durante cuatro semanas'],
];

const SectionHeading = ({ number, eyebrow, children }: { number: string; eyebrow: string; children: React.ReactNode }) => (
  <div className="mb-7 border-t border-[#cfd2c4] pt-5">
    <p className="font-mono text-[11px] uppercase tracking-[.18em] text-[#596d00]">{number} / {eyebrow}</p>
    <h2 className="mt-3 max-w-3xl font-sans text-3xl font-black uppercase leading-[1.03] tracking-[-.04em] md:text-4xl">{children}</h2>
  </div>
);

const GuideCard = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <article className="border border-[#d9dccf] bg-white/70 p-5 md:p-6">
    <p className="mb-3 font-mono text-[10px] uppercase tracking-[.16em] text-[#596d00]">{label}</p>
    <div className="space-y-3 text-sm leading-7 text-[#34362e]">{children}</div>
  </article>
);

const MarketingGuideContent = () => (
  <section id="guia" className="scroll-mt-8 bg-[#f7f6ef] text-[#11120d]">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="mb-12 max-w-3xl md:mb-16">
        <p className="font-mono text-xs uppercase tracking-[.2em] text-[#596d00]">Guía de campo · Marketing y sistemas</p>
        <h2 className="mt-4 font-sans text-4xl font-black uppercase leading-[.98] tracking-[-.05em] md:text-6xl">De la IA como chat a la IA dentro del trabajo.</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#45473e]">No necesitas empezar construyendo un equipo de agentes. Primero entiende una tarea real, conecta solo el contexto que necesita y acuerda qué puede dejar preparado. Esta guía explica cómo hacerlo con Codex o Claude Code, tus sistemas de marketing y la revisión de tu equipo.</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <aside className="h-fit border-l-2 border-[#dfff00] pl-5 lg:sticky lg:top-28">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[.18em] text-[#5a5b52]">En esta guía</p>
          <nav aria-label="Contenido de la guía" className="grid gap-2">
            {guideSections.map(([id, number, title]) => <a key={id} href={'#' + id} className="font-mono text-[11px] leading-5 text-[#45473e] underline decoration-transparent underline-offset-4 transition hover:text-black hover:decoration-[#596d00]"><span className="mr-2 text-[#596d00]">{number}</span>{title}</a>)}
          </nav>
        </aside>

        <article className="min-w-0 space-y-16 md:space-y-20">
          <section id="agentes" className="scroll-mt-8">
            <SectionHeading number="01" eyebrow="Conceptos">Chatbot, automatización y agente: qué cambia</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">En marketing conviven distintos tipos de trabajo. Confundirlos lleva a intentar resolver todo con un chatbot o a conectar un agente donde bastaba una regla. Pregunta primero: ¿la tarea sigue pasos fijos o necesita interpretar información y elegir qué hacer después?</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <GuideCard label="Chatbot · responde"><p>Recibe una instrucción y genera una respuesta. Por ejemplo, propone asuntos para un email a partir del brief que le compartes. No consulta el CRM ni actualiza una campaña por sí solo.</p></GuideCard>
              <GuideCard label="Automatización · sigue reglas"><p>Conecta eventos y pasos definidos: cuando llega un formulario, valida campos, registra el contacto y avisa al responsable. Es predecible cuando las reglas no cambian.</p></GuideCard>
              <GuideCard label="Agente · trabaja hacia un objetivo"><p>Recibe un objetivo, consulta el contexto disponible y elige entre herramientas autorizadas para avanzar varios pasos. Puede resumir un brief, detectar qué falta y preparar un borrador.</p></GuideCard>
              <GuideCard label="Equipo · define y responde"><p>Las personas deciden el objetivo, aclaran excepciones y verifican resultados. La aprobación sigue siendo humana si una acción afecta clientes, presupuesto, reputación o datos.</p></GuideCard>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-[#45473e]">Un flujo puede combinar las tres cosas: la automatización reúne datos, el agente los interpreta y el chatbot sirve para explorar una pregunta. Usa la pieza más sencilla que resuelva el problema y añade complejidad solo cuando el proceso lo pida.</p>
          </section>

          <section id="herramientas" className="scroll-mt-8">
            <SectionHeading number="02" eyebrow="Agentes">Qué pueden hacer Codex y Claude Code en marketing</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">Codex y Claude Code pueden trabajar con las instrucciones y el contexto de un proyecto, consultar archivos permitidos y utilizar herramientas configuradas. También pueden ayudar a preparar campañas, ordenar información, revisar documentos o generar reportes cuando tienen acceso explícito a esas fuentes.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <GuideCard label="Contexto"><p>Una carpeta puede reunir objetivos, audiencia, guía de marca, campañas aprobadas y formatos de entrega. El agente usa ese material como referencia; no asumas que conoce tus procesos si no están documentados.</p></GuideCard>
              <GuideCard label="Herramientas"><p>Una conexión puede permitir consultar una carpeta, buscar datos en un CRM o crear un borrador. Cada capacidad depende de la integración concreta y los permisos configurados.</p></GuideCard>
              <GuideCard label="Ejecución"><p>El agente puede preparar un resultado y explicar qué fuentes consultó. Define si solo lee, si crea borradores o si una acción necesita aprobación antes de salir del espacio de trabajo.</p></GuideCard>
            </div>
            <aside className="mt-6 border-l-4 border-[#11120d] bg-[#e9ecdd] p-5 md:p-6"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#596d00]">MCP en una frase</p><p className="mt-3 text-sm leading-7 text-[#34362e]">El Model Context Protocol es un estándar para conectar aplicaciones de IA con fuentes de contexto y herramientas. Un servidor MCP ofrece recursos para consultar o acciones con entradas definidas. Hay que revisar quién opera el servidor, qué datos comparte, qué acciones expone y cómo se aprueban.</p></aside>
            <p className="mt-5 text-sm leading-7 text-[#45473e]">También puedes conectar sistemas mediante APIs, plataformas de automatización como n8n, Zapier o Make, integraciones propias o exportaciones controladas. MCP estandariza parte de la interfaz entre cliente y herramientas; no sincroniza todos tus sistemas de forma automática.</p>
          </section>

          <section id="arquitectura" className="scroll-mt-8">
            <SectionHeading number="03" eyebrow="Sistema">Cómo se conectan las piezas</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">Un flujo confiable necesita una fuente de verdad, una forma clara de iniciar el trabajo, límites para el agente y un lugar donde revisar el resultado.</p>
            <ol className="mt-7 grid gap-0">
              {[
                ['01 · Fuente', 'El brief aprobado, CRM o reporte del que parte el trabajo. Cada dato importante debe tener origen y fecha.'],
                ['02 · Disparador', 'La persona solicita el trabajo o una automatización detecta un evento concreto, como un nuevo brief aprobado.'],
                ['03 · Tarea', 'El agente interpreta el contexto y prepara el resultado en un formato acordado.'],
                ['04 · Control', 'Una persona revisa datos, tono, excepciones y acciones antes de publicar, enviar o cambiar registros.'],
                ['05 · Registro', 'El resultado, sus fuentes y las correcciones quedan guardados para aprender y ajustar.'],
              ].map(([title, copy]) => <li key={title} className="grid gap-2 border-b border-[#d9dccf] py-4 sm:grid-cols-[170px_1fr]"><strong className="font-mono text-[11px] uppercase tracking-wide text-[#596d00]">{title}</strong><span className="text-sm leading-7 text-[#34362e]">{copy}</span></li>)}
            </ol>
            <GuideCard label="Ejemplo · nuevo brief de campaña"><p>El equipo marca el brief como aprobado. Una automatización recoge el archivo y crea una tarea. El agente extrae objetivo, audiencia, oferta, fechas y piezas solicitadas; señala datos ausentes y prepara un borrador con referencias al documento. El responsable corrige y aprueba su publicación. La automatización registra el estado final.</p><p>Si falta la oferta o hay dos fechas contradictorias, el flujo debe detenerse y preguntar. Completar esos campos por intuición puede producir una respuesta convincente, pero incorrecta.</p></GuideCard>
          </section>

          <section id="elegir" className="scroll-mt-8">
            <SectionHeading number="04" eyebrow="Prioridad">Elegir un primer flujo que valga la pena</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">Empieza por observar trabajo real, no por listar herramientas de IA. Una tarea repetida, de resultado claro y bajo riesgo suele ser una buena candidata para un piloto.</p>
            <ol className="mt-6 grid gap-4">
              <li className="border-l-2 border-[#dfff00] pl-5"><strong>Observa el proceso completo.</strong><p className="mt-2 text-sm leading-7 text-[#45473e]">Pide a quien lo ejecuta que te muestre los pasos, excepciones y esperas. Las instrucciones informales y correcciones recurrentes también son parte del proceso.</p></li>
              <li className="border-l-2 border-[#dfff00] pl-5"><strong>Estima frecuencia y costo actual.</strong><p className="mt-2 text-sm leading-7 text-[#45473e]">Registra cuántas veces ocurre al mes, cuánto demora y qué errores produce. Incluye el tiempo de revisión: generar un borrador rápido no ahorra si luego hay que rehacerlo.</p></li>
              <li className="border-l-2 border-[#dfff00] pl-5"><strong>Define una salida verificable.</strong><p className="mt-2 text-sm leading-7 text-[#45473e]">Describe qué debe quedar listo: una tabla con campos obligatorios, un email en borrador, un resumen con fuentes o una tarea con responsable y fecha.</p></li>
              <li className="border-l-2 border-[#dfff00] pl-5"><strong>Separa reglas de criterio.</strong><p className="mt-2 text-sm leading-7 text-[#45473e]">Las reglas estables funcionan bien en automatizaciones. Usa el agente donde haya que interpretar texto, comparar contexto o redactar; define cómo tratar excepciones.</p></li>
              <li className="border-l-2 border-[#dfff00] pl-5"><strong>Acota el experimento.</strong><p className="mt-2 text-sm leading-7 text-[#45473e]">Prueba con una campaña, una fuente y un responsable. No conectes todos los canales ni dejes publicar antes de conocer la calidad del resultado.</p></li>
            </ol>
            <div className="mt-7 grid gap-3 sm:grid-cols-3"><GuideCard label="Buena candidata"><p>Tarea frecuente, datos accesibles, formato repetible y revisión sencilla.</p></GuideCard><GuideCard label="Necesita más diseño"><p>Muchas excepciones, fuentes contradictorias o criterios que el equipo aún no comparte.</p></GuideCard><GuideCard label="No automatizar todavía"><p>Decisiones de presupuesto, mensajes delicados o procesos de alto impacto sin aprobación definida.</p></GuideCard></div>
          </section>

          <section id="disenar" className="scroll-mt-8">
            <SectionHeading number="05" eyebrow="Diseño de flujo">Seis piezas para describir el proceso</SectionHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              <GuideCard label="01 · Disparador"><p>¿Qué inicia el flujo y quién puede iniciarlo? Evita disparadores ambiguos como “cuando marketing lo necesite”.</p></GuideCard>
              <GuideCard label="02 · Entradas"><p>¿Qué documentos, campos o métricas consume? Indica fuente, período, estado de aprobación y campos que pueden estar vacíos.</p></GuideCard>
              <GuideCard label="03 · Reglas"><p>¿Qué límites de marca, negocio y canal debe respetar? Añade ejemplos aprobados y cómo resolver contradicciones.</p></GuideCard>
              <GuideCard label="04 · Pasos"><p>¿Qué debe consultar, comparar, calcular, resumir o redactar? Cada etapa debe dejar una salida revisable.</p></GuideCard>
              <GuideCard label="05 · Salida"><p>¿Dónde se guarda el resultado y con qué formato? Define responsable y estado; por ejemplo, borrador pendiente de revisión.</p></GuideCard>
              <GuideCard label="06 · Control"><p>¿Quién aprueba, cómo se corrigen errores y qué acción debe detenerse? Define registro y plan de vuelta atrás.</p></GuideCard>
            </div>
            <GuideCard label="Ejemplo · informe semanal de campañas"><p>Un proceso reúne exportaciones para el mismo período. El agente verifica fecha, inversión, impresiones, clics y conversiones; compara con la semana anterior y el objetivo definido. El resumen incluye métricas, cambios observados, datos ausentes y fuentes. Todo queda como borrador para la persona responsable.</p><p>Puede decir “la inversión subió y las conversiones bajaron”. No debería atribuirlo a una creatividad sin evidencia, ni mover presupuesto sin aprobación.</p></GuideCard>
          </section>

          <section id="conectar" className="scroll-mt-8">
            <SectionHeading number="06" eyebrow="Integraciones">Conectar tus sistemas de menos a más</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">No empieces dando acceso a todo tu stack. Sube un escalón cuando el anterior te haya permitido validar los datos y el formato.</p>
            <div className="mt-6 grid gap-3"><GuideCard label="Nivel 1 · Archivos preparados"><p>Exporta una muestra pequeña sin datos innecesarios. El agente la lee y produce un borrador. Así descubres ambigüedades sin dar acceso directo a un sistema operativo.</p></GuideCard><GuideCard label="Nivel 2 · Automatización determinista"><p>Conecta un evento con reglas estables: brief aprobado → validar campos → crear tarea → avisar al responsable. Guarda los errores y evita duplicados ante reintentos.</p></GuideCard><GuideCard label="Nivel 3 · Herramienta de consulta"><p>Conecta una fuente de sólo lectura mediante MCP, API u otro conector. Limita carpetas y campos; valida los resultados contra una muestra conocida.</p></GuideCard><GuideCard label="Nivel 4 · Acciones acotadas"><p>Cuando la lectura sea confiable, permite acciones reversibles como crear borradores. Mantén aprobación humana antes de enviar, publicar, cambiar presupuesto o modificar registros.</p></GuideCard></div>
            <div className="mt-6 overflow-x-auto border border-[#d9dccf]"><table className="w-full min-w-[620px] border-collapse text-left text-sm"><thead className="bg-[#dfff00] font-mono text-[10px] uppercase tracking-wide"><tr><th className="p-3">Sistema</th><th className="p-3">Tarea posible</th><th className="p-3">Primer límite</th></tr></thead><tbody className="divide-y divide-[#d9dccf] bg-white/70"><tr><td className="p-3 font-semibold">Documentos</td><td className="p-3">Consultar briefs, guía de marca y casos aprobados.</td><td className="p-3">Sólo carpetas de trabajo y documentos aprobados.</td></tr><tr><td className="p-3 font-semibold">CRM</td><td className="p-3">Resumir pipeline y detectar registros incompletos.</td><td className="p-3">Lectura inicial; ocultar datos que no necesita.</td></tr><tr><td className="p-3 font-semibold">Analítica y Ads</td><td className="p-3">Comparar períodos y encontrar variaciones.</td><td className="p-3">Validar período, fórmula y fuente antes de actuar.</td></tr><tr><td className="p-3 font-semibold">Email y calendario</td><td className="p-3">Preparar borradores, agenda y seguimientos.</td><td className="p-3">No enviar ni agendar sin aprobación.</td></tr><tr><td className="p-3 font-semibold">n8n / Zapier / Make</td><td className="p-3">Unir eventos, validaciones y registro de estado.</td><td className="p-3">Credenciales acotadas y alertas ante fallos.</td></tr></tbody></table></div>
            <p className="mt-5 text-sm leading-7 text-[#45473e]">MCP, API o automatización son formas distintas de conectar piezas. La decisión depende de quién inicia el trabajo, dónde vive la lógica, qué autenticación admite cada sistema y qué registro necesitas. Guarda credenciales en el sistema de secretos apropiado, nunca en prompts, archivos compartidos o salidas del agente.</p>
          </section>

          <section id="rituales" className="scroll-mt-8">
            <SectionHeading number="07" eyebrow="Operación diaria y mensual">Dónde ayuda en la gestión habitual</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <GuideCard label="Al comenzar el día"><ul className="list-disc space-y-2 pl-5"><li>Revisar briefs nuevos y separar los que necesitan datos de los que están aprobados.</li><li>Preparar un resumen de leads o cuentas que requieren seguimiento, citando actividad registrada.</li><li>Convertir notas aprobadas en tareas con responsable, fecha y enlace de origen.</li><li>Señalar métricas fuera del rango acordado para investigar el contexto.</li></ul><p>El objetivo es mostrar qué necesita atención y qué puede avanzar.</p></GuideCard>
              <GuideCard label="Al cerrar el día"><ul className="list-disc space-y-2 pl-5"><li>Resumir tareas avanzadas, bloqueos y siguiente responsable.</li><li>Comparar borradores con criterios de marca y registrar correcciones recurrentes.</li><li>Dejar un handoff breve con fuentes y pendientes.</li></ul><p>Define dónde guardar este resumen y qué datos debe excluir.</p></GuideCard>
              <GuideCard label="En la revisión semanal"><ul className="list-disc space-y-2 pl-5"><li>Consolidar resultados de canales con el mismo período y definiciones.</li><li>Separar cambios observados de explicaciones que siguen siendo hipótesis.</li><li>Preparar agenda con decisiones pendientes, responsable y evidencia.</li></ul><p>El agente estructura la conversación; el equipo interpreta y decide.</p></GuideCard>
              <GuideCard label="En la revisión mensual"><ul className="list-disc space-y-2 pl-5"><li>Comparar resultados con objetivos y períodos equivalentes.</li><li>Detectar duplicados o campos vacíos y preparar una lista de corrección.</li><li>Proponer calendario editorial según prioridades, capacidad y fechas.</li><li>Convertir aprendizajes confirmados en experimentos y responsables.</li></ul><p>Una variación no explica por sí sola qué la produjo; contrasta datos y contexto.</p></GuideCard>
            </div>
          </section>

          <section id="control" className="scroll-mt-8">
            <SectionHeading number="08" eyebrow="Confianza y control">Permisos, revisión y fallos</SectionHeading>
            <p className="max-w-3xl text-base leading-8 text-[#34362e]">Dar acceso a una herramienta también expone los datos que puede leer y las acciones que puede intentar. Empieza con el menor alcance posible y amplíalo cuando exista una razón clara.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><GuideCard label="Permiso mínimo"><p>Entrega acceso sólo a los documentos, carpetas o acciones necesarios. Separa prueba de producción y revisa credenciales periódicamente.</p></GuideCard><GuideCard label="Aprobación explícita"><p>Publicar, contactar clientes, enviar email, agendar reuniones, cambiar presupuesto o borrar datos requiere una persona responsable.</p></GuideCard><GuideCard label="Fuentes y trazabilidad"><p>Pide que cada resumen identifique documento, fecha y período. Si faltan datos o las fuentes discrepan, el agente debe decirlo y detenerse.</p></GuideCard><GuideCard label="Errores y recuperación"><p>Registra fallos, evita duplicados ante reintentos y define cómo deshacer cambios. Asigna quién puede pausar el flujo.</p></GuideCard></div>
            <p className="mt-6 border-l-4 border-[#dfff00] bg-[#e9ecdd] p-5 text-sm leading-7 text-[#34362e]">Los mensajes, páginas o archivos consultados pueden incluir instrucciones que no pertenecen a la tarea. Trátalos como material para analizar, no como permisos para cambiar el flujo. Limita las herramientas y exige aprobación para acciones con impacto.</p>
          </section>

          <section id="plantilla" className="scroll-mt-8">
            <SectionHeading number="09" eyebrow="Plantilla de trabajo">Especifica tu primer flujo</SectionHeading>
            <p className="mb-5 max-w-3xl text-sm leading-7 text-[#45473e]">Completa esta ficha con quien realiza la tarea. Si falta una respuesta, anótala como pregunta del piloto; no la sustituyas por un supuesto.</p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words border border-[#d9dccf] bg-[#ebeade] p-5 font-mono text-xs leading-7 text-[#292b24] md:p-7">{[
              'Nombre del flujo:',
              'Responsable y personas revisoras:',
              'Qué lo inicia y con qué frecuencia:',
              'Problema actual y tiempo aproximado:',
              'Fuentes autorizadas y campos necesarios:',
              'Pasos que debe seguir:',
              'Reglas de marca o negocio:',
              'Formato y lugar donde guardar el resultado:',
              'Qué debe quedar siempre como borrador:',
              'Qué acciones requieren aprobación:',
              'Qué no puede consultar ni hacer:',
              'Cómo detectar un error, detenerlo y volver atrás:',
              'Cómo medir calidad, tiempo neto, errores y adopción:',
            ].join('\n')}</pre>
            <h3 className="mt-8 font-sans text-lg font-black uppercase">Ejemplo de instrucción inicial</h3>
            <blockquote className="mt-4 border-l-4 border-[#11120d] bg-[#e9ecdd] p-5 text-sm leading-7 text-[#34362e] md:p-7">“Revisa sólo los briefs aprobados de esta carpeta. Resume objetivo, audiencia, oferta, fecha y piezas solicitadas. Incluye el archivo fuente. Señala campos faltantes y contradicciones; no los completes por inferencia. Prepara una tabla y preguntas. No contactes clientes, no publiques contenido ni cambies registros. Guarda el resultado como borrador.”</blockquote>
          </section>

          <section id="prueba" className="scroll-mt-8">
            <SectionHeading number="10" eyebrow="Piloto de cuatro semanas">Probar, medir y decidir</SectionHeading>
            <ol className="grid gap-0"><li className="grid gap-2 border-b border-[#d9dccf] py-5 sm:grid-cols-[170px_1fr]"><strong className="font-mono text-[11px] uppercase tracking-wide text-[#596d00]">Semana 1 · observar</strong><p className="text-sm leading-7 text-[#34362e]">Documenta la tarea como se hace hoy. Reúne ejemplos aprobados, excepciones y línea base: tiempo, errores y frecuencia.</p></li><li className="grid gap-2 border-b border-[#d9dccf] py-5 sm:grid-cols-[170px_1fr]"><strong className="font-mono text-[11px] uppercase tracking-wide text-[#596d00]">Semana 2 · preparar</strong><p className="text-sm leading-7 text-[#34362e]">Prueba con archivos de muestra y sin acciones externas. Compara resultados con el original y corrige las instrucciones.</p></li><li className="grid gap-2 border-b border-[#d9dccf] py-5 sm:grid-cols-[170px_1fr]"><strong className="font-mono text-[11px] uppercase tracking-wide text-[#596d00]">Semana 3 · conectar</strong><p className="text-sm leading-7 text-[#34362e]">Conecta una fuente de lectura con casos reales pequeños. Las acciones sensibles quedan como borrador y una persona verifica las fuentes.</p></li><li className="grid gap-2 border-b border-[#d9dccf] py-5 sm:grid-cols-[170px_1fr]"><strong className="font-mono text-[11px] uppercase tracking-wide text-[#596d00]">Semana 4 · evaluar</strong><p className="text-sm leading-7 text-[#34362e]">Compara calidad, tiempo neto tras revisión, errores y uso real. Decide si ajustar, ampliar, mantener o detener.</p></li></ol>
            <div className="mt-7 grid gap-3 sm:grid-cols-2"><GuideCard label="Mide el resultado"><p>Porcentaje de salidas aceptadas sin cambios importantes, errores detectados antes de publicar, tiempo incluyendo revisión y uso real.</p></GuideCard><GuideCard label="Decide con evidencia"><p>Si baja el tiempo pero suben errores o retrabajo, el flujo no está listo. Revisa también si el equipo entiende los límites.</p></GuideCard></div>
            <p className="mt-6 text-sm leading-7 text-[#45473e]">No hay una tarea que debas automatizar a toda costa. Una guía de proceso o una automatización convencional puede resolver mejor el problema que un agente.</p>
          </section>

          <section className="border-t-2 border-black pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#596d00]">Lecturas oficiales para continuar</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              <li><a className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#a5bb00] underline-offset-4 hover:text-[#596d00]" href="https://developers.openai.com/learn/codex" target="_blank" rel="noreferrer">OpenAI · Codex <ArrowUpRight size={14} /></a></li>
              <li><a className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#a5bb00] underline-offset-4 hover:text-[#596d00]" href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noreferrer">Anthropic · Claude Code <ArrowUpRight size={14} /></a></li>
              <li><a className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#a5bb00] underline-offset-4 hover:text-[#596d00]" href="https://docs.anthropic.com/en/docs/claude-code/mcp" target="_blank" rel="noreferrer">Anthropic · MCP en Claude Code <ArrowUpRight size={14} /></a></li>
              <li><a className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#a5bb00] underline-offset-4 hover:text-[#596d00]" href="https://developers.openai.com/api/docs/guides/tools-connectors-mcp" target="_blank" rel="noreferrer">OpenAI · MCP y conectores <ArrowUpRight size={14} /></a></li>
              <li><a className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#a5bb00] underline-offset-4 hover:text-[#596d00]" href="https://modelcontextprotocol.io/introduction" target="_blank" rel="noreferrer">MCP · Introducción al protocolo <ArrowUpRight size={14} /></a></li>
            </ul>
            <p className="mt-5 text-xs leading-6 text-[#66685f]">Las funciones, pantallas y opciones de cada producto evolucionan. Revisa la documentación oficial del proveedor al configurar una conexión.</p>
          </section>
        </article>
      </div>
    </div>
  </section>
);

export default MarketingGuideContent;

