import { P, css, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { drawPantxo } from '../art/actor';
import { PANTXO_DIALOGUE } from '../content/dialogues';
import type { Room, NPC, Hotspot, Exit } from '../engine/types';

// ----------------------------------------------------------------
//  SALA 2 — EL PASILLO del cole (el centro de operaciones).
//  Aquí está la máquina de café (moneda -> café), Pantxo cantando
//  (te da la partitura si le halagas), y tres puertas: al aula, al
//  gimnasio y a la sala de profesores.
// ----------------------------------------------------------------

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

function taquilla(ctx: CanvasRenderingContext2D, x: number) {
  r(ctx, x, 32, 22, 54, P.lockerBlue);
  r(ctx, x, 32, 22, 2, [136, 156, 176]);
  r(ctx, x, 32, 2, 54, P.lockerBlueD);
  r(ctx, x + 17, 56, 2, 6, [50, 60, 72]);   // tirador
  for (let i = 0; i < 3; i++) r(ctx, x + 6, 40 + i, 10, 1, P.lockerBlueD); // rejilla
}

function puerta(ctx: CanvasRenderingContext2D, x: number, label?: string) {
  r(ctx, x, 40, 34, 56, [114, 86, 56]);
  r(ctx, x, 40, 34, 4, [144, 110, 72]);
  r(ctx, x + 4, 44, 26, 50, [98, 74, 48]);
  r(ctx, x + 26, 66, 4, 4, P.winLit);        // pomo
  if (label) { r(ctx, x + 2, 30, 30, 8, [222, 216, 200]); drawText(ctx, label, x + 5, 31, [70, 60, 50], 1, null, 1); }
}

export function buildPasilloScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, [198, 192, 182]); // relleno base

  // pared
  r(ctx, 0, 0, 320, 96, [206, 200, 188]);
  r(ctx, 0, 0, 320, 3, [188, 182, 170]);
  r(ctx, 0, 64, 320, 3, [180, 172, 158]);   // moldura
  // techo con tubos fluorescentes
  r(ctx, 40, 6, 50, 4, [228, 226, 214]);
  r(ctx, 150, 6, 50, 4, [228, 226, 214]);
  r(ctx, 250, 6, 50, 4, [228, 226, 214]);

  // taquillas (entre la puerta del gym y la maquina)
  taquilla(ctx, 92); taquilla(ctx, 114);

  // corcho de anuncios (sobre Pantxo)
  r(ctx, 198, 22, 46, 34, [156, 116, 70]);
  r(ctx, 198, 22, 46, 2, [186, 142, 92]);
  r(ctx, 204, 28, 14, 12, [232, 230, 220]);
  r(ctx, 222, 30, 14, 16, [220, 224, 232]);
  r(ctx, 206, 44, 12, 8, [236, 222, 210]);

  // puertas: aula (izq), gimnasio (izq-centro con cartel), sala (der con cartel)
  puerta(ctx, 4);
  puerta(ctx, 52, 'GYM');

  // suelo de baldosas
  r(ctx, 0, 96, 320, 48, P.tile);
  r(ctx, 0, 96, 320, 1, [212, 208, 198]);
  for (let y = 102; y < 144; y += 8) for (let x = ((y / 8) % 2) * 12; x < 320; x += 24) r(ctx, x, y, 22, 1, P.tileD);

  puerta(ctx, 280, 'PROFES');

  // === MAQUINA DE CAFE (centro, x=140) ===
  const mx = 140;
  r(ctx, mx, 40, 40, 64, [60, 64, 72]);      // cuerpo
  r(ctx, mx, 40, 40, 3, [96, 100, 108]);
  r(ctx, mx, 40, 3, 64, [44, 48, 56]);
  r(ctx, mx + 6, 46, 28, 22, [30, 34, 40]);  // pantalla/vitrina
  r(ctx, mx + 8, 48, 24, 18, [44, 60, 70]);
  drawText(ctx, 'CAFE', mx + 10, 52, [220, 196, 120], 1, null, 1);
  for (let i = 0; i < 3; i++) r(ctx, mx + 8 + i * 9, 72, 6, 5, [180, 70, 60]); // botones
  r(ctx, mx + 30, 72, 6, 2, P.winLit);       // ranura de la moneda
  r(ctx, mx + 6, 92, 28, 10, [30, 32, 38]);  // bandeja de salida
  r(ctx, mx + 6, 92, 28, 2, [80, 84, 92]);

  return cv;
}

// El vaso de café cae en la bandeja sólo tras servir (cafe_servido)
// y hasta cogerlo (took_cafe).
export function drawCafeVaso(ctx: CanvasRenderingContext2D) {
  const vx = 152, vy = 92;
  ctx.fillStyle = css([232, 228, 220]);
  ctx.beginPath();
  ctx.moveTo(vx, vy); ctx.lineTo(vx + 10, vy);
  ctx.lineTo(vx + 8, vy + 11); ctx.lineTo(vx + 2, vy + 11); ctx.closePath(); ctx.fill();
  ctx.fillStyle = css([62, 38, 24]);
  ctx.fillRect(vx + 1, vy + 1, 8, 3);
  ctx.fillStyle = 'rgba(220,220,220,0.7)';
  ctx.fillRect(vx + 3, vy - 4, 1, 3); ctx.fillRect(vx + 6, vy - 5, 1, 3);
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'maquina', name: 'la maquina de cafe', x: 140, y: 40, w: 40, h: 48, walkTo: { x: 162, y: 138 },
    look: 'La maquina de cafe del pasillo. La misma que le robo la moneda a Gema. Hoy le toca devolver el favor.',
    needs: ['moneda'],
    needsBlocked: 'Necesito una moneda. Dicen que en el gimnasio rueda alguna por el suelo.',
    responses: {
      Usar: 'Meto la moneda, aprieto el boton mas cargado... la maquina tose, traquetea y suelta un vaso humeante.',
      Abrir: 'Meto la moneda, aprieto el boton mas cargado... la maquina tose, traquetea y suelta un vaso humeante.',
    },
    flag: 'cafe_servido',
  },
  {
    id: 'cafe', name: 'el cafe', x: 148, y: 90, w: 20, h: 15, walkTo: { x: 162, y: 138 },
    look: 'Un cafe bien cargado humeando en la bandeja. El arma secreta para ablandar a Gema.',
    pickup: { id: 'cafe', name: 'un cafe de maquina' },
    pickupIf: 'cafe_servido',
    pickupBlocked: 'La bandeja esta vacia. Primero la maquina tiene que soltar el cafe.',
    responses: { Coger: 'Cojo el vaso con cuidado de no quemarme. Misil cafeinado listo.' },
  },
  { id: 'taquillas', name: 'las taquillas', x: 92, y: 32, w: 44, h: 54, walkTo: { x: 114, y: 138 },
    look: 'Taquillas abolladas a patadas. La mia esta cerrada con un candado cuya combinacion olvide en septiembre.' },
  { id: 'corcho', name: 'el corcho', x: 198, y: 22, w: 46, h: 34, walkTo: { x: 210, y: 138 },
    look: 'Anuncios del cole: y enorme, el cartel del FESTIVAL DE MUSICA. Con la cara de Pantxo. Como no.' },
];

const NPCS: NPC[] = [
  {
    id: 'pantxo', name: 'Pantxo', x: 220, y: 78, w: 30, h: 54,
    feet: { x: 234, y: 132 }, walkTo: { x: 208, y: 138 }, facing: 'left', color: [210, 170, 220],
    look: 'Pantxo, el profe cantante. Camisa morada, bigote y un do de pecho que rompe cristales. Vive para el festival.',
    draw: drawPantxo, dialogue: PANTXO_DIALOGUE,
    accepts: {
      cafe: { line: 'Un cafe para mi voz... no, no, el cafe reseca las cuerdas vocales. Llevatelo, muchacho.' },
    },
  },
];

const EXITS: Exit[] = [
  { id: 'toAula', name: 'el aula', x: 4, y: 36, w: 38, h: 60, walkTo: { x: 28, y: 138 }, to: 'aula', entry: { x: 256, y: 135 }, arrow: 'left' },
  { id: 'toGym', name: 'el gimnasio', x: 52, y: 36, w: 34, h: 60, walkTo: { x: 68, y: 138 }, to: 'gimnasio', entry: { x: 44, y: 135 }, arrow: 'up' },
  { id: 'toSala', name: 'la sala de profes', x: 280, y: 36, w: 38, h: 60, walkTo: { x: 296, y: 138 }, to: 'sala', entry: { x: 44, y: 135 }, arrow: 'right' },
];

export const PASILLO: Room = {
  id: 'pasillo',
  build: buildPasilloScene,
  dynamic: (ctx, state) => { if (state.flags.cafe_servido && !state.flags.took_cafe) drawCafeVaso(ctx); },
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 304, minY: 122, maxY: 140 },
  start: { x: 40, y: 135 },
};
