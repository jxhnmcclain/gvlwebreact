export type QuestionId = 'role' | 'goal' | 'startingPoint' | 'built' | 'tools' | 'capability' | 'testing' | 'blocker' | 'time' | 'beginnerInput' | 'beginnerMaterial' | 'prototypeData' | 'prototypeAccess' | 'publishedUsers' | 'publishedErrors';
export type Answers = Partial<Record<QuestionId, string>>;
export type Level = 1 | 2 | 3;
export type Goal = 'tool' | 'automation' | 'app' | 'explore';

type Choice = { value: string; label: string };
export type Question = { id: QuestionId; chapter: string; title: string; help?: string; choices: Choice[] };

export const questions: Record<QuestionId, Question> = {
  role: { id: 'role', chapter: 'Tu idea', title: '¿A qué te dedicas más hoy?', choices: [
    { value: 'design', label: 'Diseño' }, { value: 'content', label: 'Contenido' }, { value: 'marketing', label: 'Marketing' }, { value: 'other', label: 'Otra cosa' },
  ] },
  goal: { id: 'goal', chapter: 'Tu idea', title: '¿Qué te gustaría construir primero?', choices: [
    { value: 'tool', label: 'Una herramienta para mi trabajo' }, { value: 'automation', label: 'Una automatización' }, { value: 'app', label: 'Una app' }, { value: 'explore', label: 'Quiero explorar' },
  ] },
  startingPoint: { id: 'startingPoint', chapter: 'Tu idea', title: '¿De dónde parte esa idea?', choices: [
    { value: 'repeated', label: 'Una tarea que repito' }, { value: 'clear', label: 'Una idea bastante clara' }, { value: 'prototype', label: 'Un prototipo que ya empecé' }, { value: 'searching', label: 'Todavía estoy buscando' },
  ] },
  built: { id: 'built', chapter: 'Lo que ya hiciste', title: '¿Qué has construido tú hasta ahora?', help: 'Cuenta algo que hayas podido probar, aunque sea pequeño.', choices: [
    { value: 'nothing', label: 'Todavía nada' }, { value: 'artifact', label: 'Un artefacto o una automatización' }, { value: 'prototype', label: 'Una app en pruebas' }, { value: 'published', label: 'Una app publicada' },
  ] },
  tools: { id: 'tools', chapter: 'Lo que ya hiciste', title: '¿Con qué has trabajado más para construir?', help: 'Elige lo que más se parece a tu experiencia. Puedes cambiarlo después.', choices: [
    { value: 'none', label: 'Aún no he usado herramientas' }, { value: 'chat', label: 'Un chat con IA' }, { value: 'codeAgent', label: 'Claude Code o Codex' }, { value: 'builder', label: 'Lovable, v0 o AI Studio' }, { value: 'code', label: 'Código por mi cuenta' },
  ] },
  capability: { id: 'capability', chapter: 'Lo que ya hiciste', title: '¿Qué puede hacer tu proyecto hoy?', choices: [
    { value: 'answer', label: 'Muestra una respuesta' }, { value: 'flow', label: 'Recibe datos y devuelve algo útil' }, { value: 'persistent', label: 'Guarda datos o lo usan otras personas' }, { value: 'unsure', label: 'No estoy seguro' },
  ] },
  testing: { id: 'testing', chapter: 'Lo que ya hiciste', title: '¿Cómo compruebas que funciona?', choices: [
    { value: 'notYet', label: 'Todavía no lo he probado' }, { value: 'one', label: 'Pruebo un ejemplo' }, { value: 'several', label: 'Pruebo varios casos' }, { value: 'errors', label: 'Reviso errores y resultados' },
  ] },
  blocker: { id: 'blocker', chapter: 'Siguiente paso', title: '¿Dónde te detienes ahora?', choices: [
    { value: 'scope', label: 'Acotar la idea' }, { value: 'build', label: 'Hacer que funcione' }, { value: 'connect', label: 'Conectar herramientas' }, { value: 'publish', label: 'Publicar' }, { value: 'advanced', label: 'Datos, usuarios o seguridad' },
  ] },
  time: { id: 'time', chapter: 'Siguiente paso', title: '¿Cuánto quieres dedicarle al primer intento?', choices: [
    { value: '20', label: '20 minutos' }, { value: '45', label: '45 minutos' }, { value: 'long', label: 'Un rato largo' },
  ] },
  beginnerInput: { id: 'beginnerInput', chapter: 'Tu punto de partida', title: '¿Puedes decir qué entraría y qué saldría de tu herramienta?', choices: [
    { value: 'yes', label: 'Sí, lo tengo claro' }, { value: 'rough', label: 'Más o menos' }, { value: 'notYet', label: 'Todavía no' },
  ] },
  beginnerMaterial: { id: 'beginnerMaterial', chapter: 'Tu punto de partida', title: '¿Con qué material podrías probar una idea?', choices: [
    { value: 'text', label: 'Un texto' }, { value: 'image', label: 'Una imagen' }, { value: 'sheet', label: 'Una tabla' }, { value: 'none', label: 'Aún no tengo material' },
  ] },
  prototypeData: { id: 'prototypeData', chapter: 'Tu punto de partida', title: '¿Dónde quedan los datos al cerrar tu proyecto?', choices: [
    { value: 'nowhere', label: 'No se guardan' }, { value: 'file', label: 'En un archivo o planilla' }, { value: 'database', label: 'En una base de datos' }, { value: 'unsure', label: 'No lo sé' },
  ] },
  prototypeAccess: { id: 'prototypeAccess', chapter: 'Tu punto de partida', title: '¿Otra persona puede probar lo que hiciste?', choices: [
    { value: 'local', label: 'Solo en mi equipo' }, { value: 'preview', label: 'Con un enlace de vista previa' }, { value: 'public', label: 'Con un enlace público' }, { value: 'unsure', label: 'No lo sé' },
  ] },
  publishedUsers: { id: 'publishedUsers', chapter: 'Tu punto de partida', title: '¿Tu app usa cuentas o guarda datos de otras personas?', choices: [
    { value: 'yes', label: 'Sí' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'No lo sé' },
  ] },
  publishedErrors: { id: 'publishedErrors', chapter: 'Tu punto de partida', title: 'Cuando falla, ¿cómo te enteras?', choices: [
    { value: 'people', label: 'Alguien me avisa' }, { value: 'screen', label: 'Veo un error en pantalla' }, { value: 'logs', label: 'Reviso registros de errores' }, { value: 'none', label: 'Aún no tengo forma de saberlo' },
  ] },
};

const baseFlow: QuestionId[] = ['role', 'goal', 'startingPoint', 'built', 'tools', 'capability', 'testing', 'blocker', 'time'];
const branchQuestions: Record<string, QuestionId[]> = {
  nothing: ['beginnerInput', 'beginnerMaterial'],
  artifact: ['prototypeData', 'prototypeAccess'],
  prototype: ['prototypeData', 'prototypeAccess'],
  published: ['publishedUsers', 'publishedErrors'],
};

export function getQuestionFlow(answers: Answers): QuestionId[] {
  const flow = baseFlow.filter(id => id !== 'capability' || answers.built !== 'nothing');
  const branch = branchQuestions[answers.built ?? ''] ?? [];
  return [...flow, ...branch];
}

type Exercise = { title: string; steps: [string, string, string]; proof: string };
const exercises: Record<Goal, Record<Level, Exercise>> = {
  tool: {
    1: { title: 'Una herramienta para una tarea que repites', steps: ['Elige una tarea concreta y escribe qué recibe y qué debería devolver.', 'Prepara tres ejemplos con información de prueba.', 'Crea un primer artefacto y compara sus respuestas con lo que esperabas.'], proof: 'Puedes mostrar una entrada y la salida correspondiente.' },
    2: { title: 'Tu herramienta en un enlace', steps: ['Elige una sola entrada y una sola salida de tu prototipo.', 'Conviértelas en una pantalla que otra persona pueda usar.', 'Prueba tres entradas y abre el enlace en otro teléfono.'], proof: 'Otra persona puede completar esa tarea desde su móvil.' },
    3: { title: 'Una herramienta que recuerda y se protege', steps: ['Elige un resultado que convenga guardar o recuperar.', 'Define qué entradas son válidas y quién debería ver el resultado.', 'Prueba una entrada errónea y un acceso sin permiso. Anota qué ocurrió.'], proof: 'Sabes qué se guarda, quién puede verlo y qué pasa ante un error.' },
  },
  automation: {
    1: { title: 'El mapa de una automatización', steps: ['Escribe qué evento inicia el proceso y qué datos recibe.', 'Anota la acción siguiente y el resultado esperado.', 'Simula tres ejecuciones con información ficticia.'], proof: 'Puedes explicar el flujo completo con tres ejemplos.' },
    2: { title: 'Dos pasos que trabajan juntos', steps: ['Elige dos pasos de tu proceso y conéctalos con datos de prueba.', 'Registra qué pasó en tres ejecuciones.', 'Provoca un fallo y decide cómo lo detectarías.'], proof: 'Tienes tres resultados y una forma de reconocer un fallo.' },
    3: { title: 'Una automatización que tolera fallos', steps: ['Haz que dos envíos iguales no creen trabajo duplicado.', 'Registra errores y prepara un reintento controlado.', 'Prueba una entrada repetida y un fallo deliberado.'], proof: 'Puedes mostrar qué ocurrió en ambas pruebas.' },
  },
  app: {
    1: { title: 'La primera tarea de tu app', steps: ['Describe una sola tarea que otra persona quiera resolver.', 'Dibuja o crea la pantalla necesaria con datos ficticios.', 'Recorre la tarea y anota dónde te detuviste.'], proof: 'Alguien puede entender qué haría en esa pantalla.' },
    2: { title: 'Una app que alguien puede abrir', steps: ['Completa una tarea de principio a fin.', 'Publica una versión y ábrela desde otro teléfono.', 'Pide a alguien que intente la tarea y observa dónde se detiene.'], proof: 'Existe un enlace y una tarea que otra persona pudo probar.' },
    3: { title: 'Datos y acceso en tu app', steps: ['Elige un dato que la app necesite conservar.', 'Define quién debería poder verlo o cambiarlo.', 'Prueba una entrada inválida y un acceso sin permiso con datos ficticios.'], proof: 'Puedes describir qué permitió la app y qué bloqueó.' },
  },
  explore: {
    1: { title: 'Una idea que cabe en una pantalla', steps: ['Anota tres molestias concretas de tu trabajo.', 'Elige una y explica quién la vive.', 'Haz un boceto o artefacto que muestre una posible respuesta.'], proof: 'Tienes una situación, una persona y una respuesta visible.' },
    2: { title: 'Una idea que otros pueden probar', steps: ['Escoge una sola tarea de tu idea.', 'Crea un prototipo compartible para recorrerla.', 'Registra tres observaciones de quienes lo prueben.'], proof: 'Tienes un enlace y tres observaciones útiles.' },
    3: { title: 'Prueba la suposición más difícil', steps: ['Anota qué tendría que ser cierto para que tu idea funcione.', 'Crea una prueba pequeña con datos ficticios.', 'Registra tres intentos y qué cambiarías después.'], proof: 'Puedes decidir qué continuar, cambiar o descartar.' },
  },
};

const roleExamples: Record<string, string> = {
  design: 'Puedes usar una tarea de diseño como ejemplo.',
  content: 'Puedes usar una tarea de contenido como ejemplo.',
  marketing: 'Puedes usar una tarea de marketing como ejemplo.',
  other: 'Elige una tarea de tu propio trabajo como ejemplo.',
};
const startingNotes: Record<string, string> = {
  repeated: 'Parte de la tarea que ya repites; tendrás un caso real para comparar.',
  clear: 'Recorta tu idea hasta que solo quede una tarea para este intento.',
  prototype: 'Aprovecha el prototipo que ya comenzaste; elige una parte que puedas terminar.',
  searching: 'Si aún buscas una idea, observa una tarea que te haya hecho perder tiempo esta semana.',
};
const blockerNotes: Record<string, string> = {
  scope: 'Empieza por una sola tarea; deja las otras ideas fuera de esta prueba.',
  build: 'Antes de sumar funciones, comprueba que una entrada produce una salida útil.',
  connect: 'Dibuja primero qué dato pasa de una herramienta a la otra.',
  publish: 'Al terminar, abre el resultado desde otro dispositivo.',
  advanced: 'Usa datos ficticios mientras exploras acceso y seguridad.',
};
const toolNotes: Record<string, string> = {
  none: 'Puedes comenzar con papel y un chat de IA cuando tengas la tarea definida.',
  chat: 'Usa el chat con IA para escribir una primera versión y revisa cada salida con tus ejemplos.',
  codeAgent: 'Si usas Claude Code o Codex, describe la tarea y pídele cambios pequeños que puedas probar.',
  builder: 'Si usas Lovable, v0 o AI Studio, construye una sola pantalla antes de añadir otras funciones.',
  code: 'Si escribes código, mantén el primer intento en una sola tarea y prueba sus entradas.',
};
const testingNotes: Record<string, string> = {
  notYet: 'Haz una prueba normal y otra con una entrada que podría fallar.',
  one: 'Ya probaste un ejemplo. Agrega otro distinto antes de dar el ejercicio por terminado.',
  several: 'Guarda los resultados de tus pruebas para decidir qué corregir.',
  errors: 'Usa los errores que ya observas para elegir qué corregir primero.',
};

function technicalNote(answers: Answers): string {
  if (answers.built === 'nothing') {
    const input = answers.beginnerInput === 'notYet' ? 'Empieza escribiendo qué recibiría y qué devolvería tu idea.' : 'Usa la entrada y salida que imaginaste como base.';
    const material = { text: 'Prueba con un texto breve.', image: 'Prueba con una imagen ficticia.', sheet: 'Prueba con una tabla pequeña.', none: 'Si aún no tienes material, inventa un ejemplo sin datos personales.' }[answers.beginnerMaterial ?? 'none'];
    return `${input} ${material}`;
  }
  if (answers.built === 'published') {
    const users = answers.publishedUsers === 'yes' ? 'Usa cuentas y datos de prueba; no experimentes con información de usuarios reales.' : 'Si aún no sabes si guardas datos de otras personas, revisa eso antes de ampliar la app.';
    const errors = answers.publishedErrors === 'logs' ? 'Ya revisas registros: elige un error concreto para esta práctica.' : 'Anota cómo detectarás un fallo sin esperar a que otra persona te avise.';
    return `${users} ${errors}`;
  }
  const data = answers.prototypeData === 'file' ? 'Trabaja sobre una copia de tu archivo o planilla.' : answers.prototypeData === 'database' ? 'Usa una base de prueba y datos ficticios.' : 'Puedes empezar sin guardar datos; comprueba primero el flujo.';
  const access = answers.prototypeAccess === 'local' ? 'Tu prueba termina cuando otra persona pueda abrir un enlace.' : 'Abre el enlace desde otro teléfono para comprobarlo.';
  return `${data} ${access}`;
}

export function deriveDiagnostic(answers: Answers) {
  const published = answers.built === 'published';
  const functional = answers.capability === 'flow' || answers.capability === 'persistent';
  const publicAccess = answers.prototypeAccess === 'public';
  const level: Level = answers.built === 'nothing' || !answers.built ? 1 : published && functional ? 3 : publicAccess && functional ? 3 : 2;
  const goal: Goal = (['tool', 'automation', 'app', 'explore'].includes(answers.goal ?? '') ? answers.goal : 'explore') as Goal;
  const exercise = exercises[goal][level];
  const reason = level === 1
    ? 'Estás preparando tu primer artefacto. Lo mejor es empezar con una tarea pequeña que puedas probar.'
    : level === 2
      ? published ? 'Ya publicaste algo. Antes de añadir más piezas, conviene comprobar que su tarea principal funcione de principio a fin.' : 'Ya hiciste algo propio. El siguiente paso es convertirlo en una tarea que otra persona pueda probar.'
      : 'Ya tienes una app funcional que otras personas pueden abrir. Puedes empezar a trabajar en datos, acceso y fiabilidad.';
  const timeNote = answers.time === '20'
    ? 'Para un intento de 20 minutos, completa el primer paso y deja anotado qué probarás después.'
    : answers.time === '45'
      ? 'En 45 minutos, intenta completar los tres pasos con un solo ejemplo.'
      : 'Si tienes más tiempo, añade un caso que pueda fallar y observa qué sucede.';
  return { level, goal, exercise, reason, timeNote, roleNote: roleExamples[answers.role ?? ''] ?? roleExamples.other, startingNote: startingNotes[answers.startingPoint ?? ''] ?? startingNotes.searching, blockerNote: blockerNotes[answers.blocker ?? ''] ?? blockerNotes.scope, toolNote: toolNotes[answers.tools ?? ''] ?? toolNotes.none, testingNote: testingNotes[answers.testing ?? ''] ?? testingNotes.notYet, technicalNote: technicalNote(answers) };
}

export function serializeDiagnostic(answers: Answers): string {
  const { level, goal } = deriveDiagnostic(answers);
  return JSON.stringify({ source: 'academy_diagnostic', version: 1, level, goal, exercise: `${goal}_${level}`, answers, consent: 'academy_updates_educational_v1' });
}
