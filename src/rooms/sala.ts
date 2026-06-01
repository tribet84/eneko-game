import { P, css, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { drawGema } from '../art/actor';
import { GEMA_DIALOGUE } from '../content/dialogues';
import type { Room, NPC, Hotspot, Exit } from '../engine/types';

// ----------------------------------------------------------------
//  SALA 3 — LA SALA DE PROFESORES.
//  Aquí está Gema con su mesa y su ordenador (donde vive el examen).
//  El final: le das el café a Gema CON el pendrive ya en la mano.
//  El motor exige ambos a la vez (needAlso): mientras ella se
//  distrae con el primer sorbo, Eneko hace el cambiazo. FIN.
// ----------------------------------------------------------------

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

export function buildSalaScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, [150, 130, 110]); // relleno base

  // pared cálida (sala de profes acogedora)
  r(ctx, 0, 0, 320, 100, [168, 140, 116]);
  r(ctx, 0, 0, 320, 3, [148, 122, 100]);
  r(ctx, 0, 70, 320, 3, [142, 116, 94]);    // moldura

  // estanteria de archivadores (izquierda)
  r(ctx, 8, 18, 70, 82, [96, 70, 50]);
  r(ctx, 8, 18, 70, 3, [128, 96, 68]);
  const fold: RGB[] = [[170, 70, 60], [70, 90, 130], [180, 150, 80], [90, 130, 90]];
  for (let row = 0; row < 4; row++) {
    r(ctx, 12, 24 + row * 19, 62, 16, [60, 44, 32]);   // balda
    for (let i = 0; i < 7; i++) r(ctx, 14 + i * 9, 25 + row * 19, 7, 14, fold[(i + row) % 4]); // archivadores
  }

  // ventana (centro-arriba)
  r(ctx, 120, 16, 56, 40, [80, 64, 50]);
  r(ctx, 123, 19, 50, 34, [150, 178, 196]);  // cielo plano claro
  r(ctx, 123, 19, 50, 8, [176, 198, 212]);
  r(ctx, 146, 19, 3, 34, [80, 64, 50]);       // cruceta
  r(ctx, 123, 34, 50, 3, [80, 64, 50]);

  // suelo
  r(ctx, 0, 100, 320, 44, [132, 104, 78]);
  r(ctx, 0, 100, 320, 1, [160, 128, 96]);
  for (let y = 106; y < 144; y += 7) for (let x = ((y / 7) % 2) * 10; x < 320; x += 20) r(ctx, x, y, 18, 1, [110, 86, 62]);

  // === LA MESA de Gema (derecha) con el ordenador ===
  const dx = 196;
  r(ctx, dx, 92, 116, 12, [120, 88, 56]);     // tablero
  r(ctx, dx, 92, 116, 2, [156, 116, 74]);
  r(ctx, dx + 6, 104, 8, 30, [92, 66, 42]);   // patas
  r(ctx, dx + 100, 104, 8, 30, [92, 66, 42]);
  // ordenador (monitor viejo)
  r(ctx, dx + 60, 64, 34, 30, [70, 70, 76]);  // carcasa
  r(ctx, dx + 64, 68, 26, 20, [60, 90, 90]);  // pantalla
  r(ctx, dx + 66, 70, 22, 16, [110, 150, 140]);
  drawText(ctx, 'EXAM', dx + 68, 73, [220, 240, 220], 1, null, 1);
  r(ctx, dx + 72, 94, 12, 4, [60, 60, 66]);   // peana
  // teclado y papeles
  r(ctx, dx + 30, 96, 24, 6, [180, 176, 168]);
  r(ctx, dx + 6, 96, 18, 6, [232, 228, 218]); // examenes apilados
  r(ctx, dx + 6, 96, 18, 1, [200, 60, 50]);   // boli rojo encima

  // taza vacia de Gema sobre la mesa
  r(ctx, dx + 96, 86, 8, 7, [210, 206, 198]);
  r(ctx, dx + 103, 88, 2, 3, [180, 176, 168]); // asa

  return cv;
}

const HOTSPOTS: Hotspot[] = [
  { id: 'ordenador', name: 'el ordenador de Gema', x: 256, y: 64, w: 34, h: 32, walkTo: { x: 252, y: 140 },
    look: 'Su ordenador, con el examen abierto. Si metiera el pendrive de Unai aqui, cambiaria el examen entero.',
    responses: {
      Usar: 'No puedo trastear en su ordenador con ella delante mirando. Primero hay que distraerla. Un cafe, quiza...',
      Abrir: 'Imposible con Gema vigilando cada tecla. Necesito que aparte la vista un momento.',
    } },
  { id: 'examenes', name: 'los examenes', x: 200, y: 90, w: 24, h: 12, walkTo: { x: 214, y: 140 },
    look: 'Una pila de examenes y un boligrafo rojo afiladisimo. El de manana esta dentro del ordenador, no aqui.' },
  { id: 'archivadores', name: 'los archivadores', x: 8, y: 18, w: 70, h: 82, walkTo: { x: 60, y: 140 },
    look: 'Archivadores de colores con anos de notas. En alguno estara mi expediente. Mejor no mirar.' },
  { id: 'ventanaS', name: 'la ventana', x: 120, y: 16, w: 56, h: 40, walkTo: { x: 148, y: 140 },
    look: 'Da al patio. Desde aqui los profes vigilan los recreos como halcones con cafe.' },
  { id: 'taza', name: 'la taza de Gema', x: 290, y: 84, w: 12, h: 10, walkTo: { x: 280, y: 140 },
    look: 'Su taza. Vacia, con un poso seco. Lleva horas pidiendo a gritos un relleno.' },
];

const NPCS: NPC[] = [
  {
    id: 'gema', name: 'Gema', x: 138, y: 74, w: 28, h: 56,
    feet: { x: 152, y: 126 }, walkTo: { x: 182, y: 140 }, facing: 'right', color: [220, 210, 230],
    look: 'Gema, mi profesora. Cara de pocas horas de sueno y muchas de correccion. Y sin su cafe. Peligro.',
    draw: drawGema, dialogue: GEMA_DIALOGUE,
    accepts: {
      // EL FINAL. Darle el cafe teniendo el USB = distraccion + cambiazo.
      cafe: {
        needAlso: 'usb',
        missing: 'Si le doy solo el cafe se queda mirandome la cara. Necesito el pendrive de Unai listo en la mano para hacer el cambiazo mientras se distrae con el primer sorbo.',
        line: 'Ay... un cafe de verdad. Eneko, hijo, no sabes lo que necesitaba esto. *cierra los ojos*',
        remove: ['cafe', 'usb'],
        flag: 'win',
        card: [
          'OPERACION GEMA: EXITO',
          '',
          'Mientras Gema cierra los ojos con el',
          'primer sorbo, Eneko desliza el pendrive',
          'en su ordenador. Click. El examen brutal',
          'de derivadas se convierte en el facilito',
          'del primo de Unai.',
          '',
          'Manana: notable sin estudiar.',
          'Unai: orgulloso desde su pupitre.',
          'Eneko: leyenda silenciosa del cole.',
          '',
          'FIN',
          '',
          'Gracias por jugar a OPERACION GEMA.',
        ],
      },
      // dar el USB suelto: rechazo con gracia
      usb: { line: '¿Un pendrive? Eneko, en mi sala no se juega con cacharros. Guardatelo.' },
      // dar la moneda: rechazo con gracia
      moneda: { line: 'Quedate tu el dinero, anda. Lo que yo necesito no se compra con una moneda... o casi.' },
    },
  },
];

const EXITS: Exit[] = [
  { id: 'toPasillo', name: 'el pasillo', x: 4, y: 36, w: 38, h: 60, walkTo: { x: 30, y: 138 }, to: 'pasillo', entry: { x: 282, y: 135 }, arrow: 'left' },
];

export const SALA: Room = {
  id: 'sala',
  build: buildSalaScene,
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 290, minY: 124, maxY: 140 },
  start: { x: 44, y: 135 },
};
