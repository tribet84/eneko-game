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
//  UNAI — el colega que tiene el plan. Da el pendrive con el examen
//  fácil y suelta las dos pistas clave: (1) Gema se ablanda con un
//  café, (2) la máquina del pasillo necesita una moneda. Sin regalar
//  la solución: el jugador tiene que atar los cabos.
// ----------------------------------------------------------------
export const UNAI_DIALOGUE: Dialogue = {
  start: {
    npc: 'Eneko, tio, manana el examen de Gema y tu sin dar un palo al agua. Pero relajate: tengo un PLAN.',
    options: [
      { text: '¿Que plan?', to: 'plan' },
      { text: '¿Y como ablando a Gema?', to: 'gema' },
      { text: 'Paso de tus planes.', to: 'end' },
    ],
  },
  plan: {
    npc: 'El ano pasado mi primo hizo el examen FACIL de Gema. Lo tengo aqui, en este pendrive. Si lo cargas en su ordenador, le cambiamos el examen sin que se entere. El problema: Gema no se mueve de su mesa ni para respirar.',
    options: [
      { text: '¿Y como la distraigo?', to: 'cafe' },
      { text: 'Dame el pendrive.', to: 'dado', give: 'usb', set: 'tiene_usb', ifNot: 'tiene_usb' },
      { text: 'Dejame pensarlo.', to: 'end' },
    ],
  },
  cafe: {
    npc: 'Cafe. Gema sin su cafe de maquina es un dragon con boligrafo rojo. Le das uno y se derrite. La maquina esta en el pasillo... pero se traga monedas. Mira por clase, que siempre rueda alguna por el suelo.',
    options: [
      { text: 'Dame el pendrive entonces.', to: 'dado', give: 'usb', set: 'tiene_usb', ifNot: 'tiene_usb' },
      { text: 'Ya tengo el pendrive, voy a por la moneda.', to: 'end', if: 'tiene_usb', set: 'goal_plan' },
      { text: 'Voy a por ello.', to: 'end', ifNot: 'tiene_usb', set: 'goal_plan' },
    ],
  },
  gema: {
    npc: 'Con cara dura no, que te tiene calado. Hay que ser fino: la distraes con algo que le encante y haces el cambiazo cuando no mire. Pista: le encanta una cosa calentita y amarga.',
    options: [
      { text: 'Cuentame el plan entero.', to: 'plan' },
      { text: 'Vale, vale.', to: 'end' },
    ],
  },
  dado: {
    npc: 'Ahi lo tienes. Cafe primero, cambiazo despues. Y Eneko... no la cagues, que mi primo tardo un ano en conseguir esto.',
    options: [
      { text: 'Confia en mi.', to: 'end', set: 'goal_plan' },
    ],
  },
};

// ----------------------------------------------------------------
//  GEMA — la profesora. Estresada, sin cafe, con un examen brutal
//  preparado. Suelta las pistas: se ablandaria con un cafe, la
//  maquina le robo la moneda, el ordenador es donde esta el examen.
// ----------------------------------------------------------------
export const GEMA_DIALOGUE: Dialogue = {
  start: {
    npc: '¿Eneko? El examen es manana y es dificil. Muy dificil. Y no, no pienso quitar el tema de las derivadas.',
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
    npc: 'Agotada. La maquina del pasillo me ha robado la ultima moneda, este ordenador va a su bola y el examen no se corrige solo. Necesito un cafe YA.',
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
