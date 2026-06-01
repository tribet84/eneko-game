// Árboles de diálogo. Cada nodo: una línea del NPC + las opciones del jugador.
// El `to` de una opción apunta al siguiente nodo ('end' cierra la conversación).
// `set` levanta un flag; `if`/`ifNot` muestran la opción según un flag;
// `once` esconde la opción tras elegirla; `give` otorga un item.
export interface Opt {
  text: string;
  to: string;
  set?: string;
  give?: string;   // otorga este item al elegir
  if?: string;
  ifNot?: string;
  once?: boolean;
  card?: string[]; // muestra una tarjeta de final/transición al elegir
  goto?: string;   // sala a la que viajar tras la tarjeta (ausente = final)
}
export interface DialogueNode {
  npc: string;
  options: Opt[];
}
export type Dialogue = Record<string, DialogueNode>;

// ----------------------------------------------------------------
//  UNAI — el colega del PLAN. No tiene el examen: te explica la
//  jugada y te manda a las tres piezas (Blanca = pendrive,
//  maquina = cafe, gimnasio = moneda). El cerebro de la operacion.
// ----------------------------------------------------------------
export const UNAI_DIALOGUE: Dialogue = {
  start: {
    npc: 'Eneko, manana el examen de naturales de Gema y tu en blanco total. Pero relajate: tengo un PLAN maestro.',
    options: [
      { text: '¿Que plan?', to: 'plan' },
      { text: '¿Como ablando a Gema?', to: 'gema' },
      { text: 'Paso de tus planes.', to: 'end' },
    ],
  },
  plan: {
    npc: 'Tres pasos. Uno: el examen facil del ano pasado lo tiene Blanca en un pendrive, es la mas lista de clase. Dos: a Gema la distraes con un cafe. Tres: mientras sorbe, le metes el pendrive en el ordenador. Cambiazo y a correr.',
    options: [
      { text: '¿Y como convenzo a Blanca?', to: 'blanca' },
      { text: '¿De donde saco el cafe?', to: 'cafe' },
      { text: 'Entendido, manos a la obra.', to: 'end', set: 'goal_plan' },
    ],
  },
  blanca: {
    npc: 'Blanca no regala nada. Esta obsesionada con el festival de musica del cole. Averigua que le falta y traeselo: ahi tienes tu pendrive.',
    options: [
      { text: 'Voy a hablar con ella.', to: 'end', set: 'goal_plan' },
      { text: '¿Y lo del cafe?', to: 'cafe' },
    ],
  },
  cafe: {
    npc: 'La maquina del pasillo suelta cafe, pero traga monedas. ¿Monedas? En el gimnasio rueda alguna. Eso si: Alfonso no te deja coger ni un boli sin sudar la camiseta primero. Ya lo conoces.',
    options: [
      { text: 'Al gimnasio, entonces.', to: 'end', set: 'goal_plan' },
      { text: '¿Y lo de Blanca?', to: 'blanca' },
    ],
  },
  gema: {
    npc: 'Con cara dura no, que te tiene calado. Finura: cafe, distraccion y cambiazo. Pero sin el pendrive de Blanca no hay nada que cambiar. Empieza por ahi.',
    options: [
      { text: 'Cuentame el plan entero.', to: 'plan' },
      { text: 'Vale, vale.', to: 'end' },
    ],
  },
};

// ----------------------------------------------------------------
//  BLANCA — companera de Eneko, china y la mas lista de clase.
//  Tiene el pendrive con el examen facil. Te lo da SI le llevas la
//  partitura con la letra de la cancion de Pantxo (la del festival).
//  El intercambio real ocurre en su `accepts.partitura` (en la sala).
// ----------------------------------------------------------------
export const BLANCA_DIALOGUE: Dialogue = {
  start: {
    npc: 'Hola Eneko. Si, tengo el examen facil del ano pasado en mi pendrive. Pero ahora mismo estoy con un problema mas gordo: el festival.',
    options: [
      { text: '¿Que pasa con el festival?', to: 'festival' },
      { text: '¿Te cambio el pendrive por algo?', to: 'trato' },
      { text: 'Nada, ya hablamos.', to: 'end' },
    ],
  },
  festival: {
    npc: 'Me apunte a cantar para no aburrirme y fue un error historico. No me se la letra de la cancion, y el ensayo es hoy. Estoy en panico.',
    options: [
      { text: '¿Y si te consigo la letra?', to: 'trato' },
      { text: 'Animo, tu puedes.', to: 'start' },
    ],
  },
  trato: {
    npc: 'Traeme la partitura con la letra entera y el pendrive es tuyo, palabra. Pantxo, el profe, se la sabe de memoria: vive cantandola por el pasillo.',
    options: [
      { text: 'Voy a por la partitura.', to: 'end', set: 'goal_partitura' },
      { text: 'Dejame pensarlo.', to: 'end' },
    ],
  },
};

// ----------------------------------------------------------------
//  PANTXO — el profesor cantante. Te da la partitura, pero solo a
//  quien aprecia su arte: hay que halagarle el canto (flag le_gusto)
//  antes de que suelte la letra.
// ----------------------------------------------------------------
export const PANTXO_DIALOGUE: Dialogue = {
  start: {
    npc: 'Laaa-la-laaaa... ¡Ah, Eneko! ¿A que suena celestial mi cancion para el festival? La compuse yo.',
    options: [
      { text: 'Canta usted como los angeles, profe.', to: 'gustado', set: 'le_gusto', ifNot: 'le_gusto' },
      { text: '¿Me presta la letra de la cancion?', to: 'letra' },
      { text: 'Ahora no puedo, profe. (Salir)', to: 'end' },
    ],
  },
  gustado: {
    npc: '¡Por fin un alma sensible en este cole de zoquetes! Dime, muchacho, ¿que puedo hacer por ti?',
    options: [
      { text: '¿Me presta la partitura con la letra?', to: 'letra' },
      { text: 'Solo queria felicitarle.', to: 'end' },
    ],
  },
  letra: {
    npc: 'La partitura es sagrada. Solo se la presto a quien aprecia el arte de verdad. ¿Lo aprecias?',
    options: [
      { text: 'Profe, es usted un autentico artista.', to: 'letra', set: 'le_gusto', ifNot: 'le_gusto' },
      { text: 'Tome, deme la partitura, la cuidare.', to: 'gracias', give: 'partitura', set: 'tiene_partitura', if: 'le_gusto', ifNot: 'tiene_partitura' },
      { text: 'Dejelo, profe. (Salir)', to: 'end' },
    ],
  },
  gracias: {
    npc: '¡Esas palabras me llegan! Ahi la tienes. Cantala con el alma, no como esos descerebrados del pasillo.',
    options: [
      { text: 'Cuente con ello, profe.', to: 'end' },
    ],
  },
};

// ----------------------------------------------------------------
//  ALFONSO — profe de gimnasia. "El que lo intenta tiene un 5".
//  La moneda esta en el suelo del gimnasio, pero no deja cogerla
//  sin sudar: hay que INTENTAR el ejercicio (flag se levanta al
//  Usar las espalderas), y entonces se desbloquea la moneda.
// ----------------------------------------------------------------
export const ALFONSO_DIALOGUE: Dialogue = {
  start: {
    npc: '¡Eneko! En mi gimnasio hay una regla: el que lo intenta tiene un 5. El que no mueve un musculo, un cero como una casa. ¿Vienes a sudar?',
    options: [
      { text: '¿Que tengo que hacer?', to: 'reto' },
      { text: '¿Esa moneda del suelo es de alguien?', to: 'moneda' },
      { text: 'Solo pasaba por aqui. (Salir)', to: 'end' },
    ],
  },
  reto: {
    npc: 'Sube por las espalderas. No me importa que lo hagas fatal, en plan croqueta. Solo que lo INTENTES. Con eso ya tienes tu cinco, hombre.',
    options: [
      { text: 'Voy a intentarlo.', to: 'end', set: 'goal_reto' },
      { text: 'Quiza luego.', to: 'end' },
    ],
  },
  moneda: {
    npc: 'Esa calderilla lleva ahi semanas. Pero ni se te ocurra agacharte a cogerla sin haber sudado. Aqui se gana todo currando. Intenta el ejercicio y luego hablamos.',
    options: [
      { text: 'Entendido, a las espalderas.', to: 'end', set: 'goal_reto' },
    ],
  },
};

// ----------------------------------------------------------------
//  GEMA — la profesora de naturales. Estresada, sin cafe, con el
//  examen de suelo sedimentario preparado. Pistas: se ablandaria
//  con un cafe, la maquina le robo la moneda, el examen esta en su
//  ordenador. El final ocurre en su `accepts.cafe` (con needAlso usb).
// ----------------------------------------------------------------
export const GEMA_DIALOGUE: Dialogue = {
  start: {
    npc: '¿Eneko? El examen de naturales es manana y es dificil. Muy dificil. Y no, no pienso quitar el tema del suelo sedimentario.',
    options: [
      { text: '¿No lo puede dejar mas facil?', to: 'facil' },
      { text: '¿Se encuentra bien, profe?', to: 'cansada' },
      { text: 'Nada, que ya me iba.', to: 'end' },
    ],
  },
  facil: {
    npc: '¿Facil? Ja. Tendrias que pillarme de un humor excelente. Y mirame: llevo desde las siete sin un misero cafe.',
    options: [
      { text: '¿Un cafe la pondria de buenas?', to: 'cafe', set: 'goal_gema_cafe' },
      { text: 'Ya... (Salir)', to: 'end' },
    ],
  },
  cansada: {
    npc: 'Agotada. La maquina del pasillo me ha robado la ultima moneda, este ordenador va a su bola y los estratos no se corrigen solos. Necesito un cafe YA.',
    options: [
      { text: 'Le traere uno, profe.', to: 'end', set: 'goal_gema_cafe' },
    ],
  },
  cafe: {
    npc: 'Un cafe bien cargado y a lo mejor... a lo mejor me ablando con el examen. Pero solo a lo mejor, no te confies.',
    options: [
      { text: 'Voy volando.', to: 'end', set: 'goal_gema_cafe' },
    ],
  },
};
