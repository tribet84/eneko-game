import { P, css, type RGB } from '../art/palette';
import { Pixels, rampPick } from '../art/dither';
import { drawText } from '../art/font';
import { drawUnai } from '../art/actor';
import { UNAI_DIALOGUE } from '../content/dialogues';
import type { Room, NPC, Hotspot, Exit } from '../engine/types';

// ----------------------------------------------------------------
//  SALA 1 — EL AULA de 4º de la ESO (Corazonistas).
//  Aquí empieza todo: Unai te suelta el plan y te da el pendrive,
//  y por el suelo rueda la moneda para la máquina de café.
//  Pizarra verde al fondo, ventana con luz, pupitres y la puerta
//  al pasillo a la derecha.
// ----------------------------------------------------------------

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

function pupitre(ctx: CanvasRenderingContext2D, x: number, y: number) {
  r(ctx, x, y, 26, 4, P.deskWood);          // tablero
  r(ctx, x, y, 26, 1, [212, 184, 140]);
  r(ctx, x + 2, y + 4, 3, 12, P.deskWoodSh); // patas
  r(ctx, x + 21, y + 4, 3, 12, P.deskWoodSh);
  r(ctx, x + 4, y + 9, 18, 3, [70, 70, 78]); // silla/respaldo detrás
}

export function buildAulaScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, [206, 198, 182]); // relleno base (pared) sin huecos

  // pared con friso inferior
  r(ctx, 0, 0, 320, 96, [214, 206, 190]);
  r(ctx, 0, 70, 320, 4, [188, 178, 160]);   // moldura
  r(ctx, 0, 0, 320, 3, [196, 188, 172]);

  // ventana a la izquierda con cielo dithered
  r(ctx, 12, 18, 60, 44, [60, 50, 40]);      // marco
  const img = ctx.createImageData(54, 38);
  const px = new Pixels(img, 54, 38);
  const sky: RGB[] = [P.skyUpper, P.skyMid, P.skyLow, P.skyHorizon];
  for (let y = 0; y < 38; y++) for (let x = 0; x < 54; x++) px.set(x, y, rampPick(sky, y / 38, x, y));
  ctx.putImageData(img, 15, 21);
  r(ctx, 40, 21, 3, 38, [60, 50, 40]);       // cruceta vertical
  r(ctx, 15, 38, 54, 3, [60, 50, 40]);       // cruceta horizontal

  // pizarra verde al fondo-centro
  r(ctx, 110, 14, 150, 52, [42, 34, 26]);    // marco madera
  r(ctx, 114, 18, 142, 44, P.schoolGreen);
  r(ctx, 114, 18, 142, 2, [128, 158, 118]);
  r(ctx, 114, 58, 142, 4, P.schoolGreenD);   // canaleta de tizas
  // tiza (fuente bitmap del motor para no romper el look pixel)
  drawText(ctx, 'EXAMEN  MANANA', 130, 26, [224, 228, 218], 1, null, 1);
  drawText(ctx, 'Tema 7: derivadas', 130, 42, [196, 214, 190], 1, null, 1);

  // suelo de baldosas
  r(ctx, 0, 96, 320, 48, P.tile);
  r(ctx, 0, 96, 320, 1, [212, 208, 198]);
  for (let y = 102; y < 144; y += 8) for (let x = ((y / 8) % 2) * 12; x < 320; x += 24) r(ctx, x, y, 22, 1, P.tileD);

  // pupitres repartidos
  pupitre(ctx, 150, 104);
  pupitre(ctx, 196, 116);
  pupitre(ctx, 244, 104);

  // puerta al pasillo (derecha)
  r(ctx, 276, 40, 34, 56, [120, 92, 60]);    // hoja
  r(ctx, 276, 40, 34, 4, [150, 116, 76]);
  r(ctx, 278, 44, 30, 50, [104, 78, 50]);
  r(ctx, 300, 66, 4, 4, P.winLit);           // pomo
  r(ctx, 274, 36, 38, 5, [88, 64, 42]);      // dintel

  return cv;
}

// La moneda en el suelo, bajo el pupitre del centro, hasta cogerla.
export function drawMoneda(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = css(P.tileD);
  ctx.beginPath(); ctx.ellipse(206, 138, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = css([214, 188, 110]);
  ctx.beginPath(); ctx.arc(205, 137, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = css(P.sunCore);
  ctx.fillRect(204, 136, 1, 1);
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'moneda', name: 'una moneda', x: 198, y: 132, w: 16, h: 12, walkTo: { x: 206, y: 140 },
    look: 'Una moneda de 1 euro, escondida bajo un pupitre. Alguien la dio por perdida. Su error, mi suerte.',
    pickup: { id: 'moneda', name: 'una moneda de 1 euro' },
    responses: { Coger: 'Mia. Esto va directo a la maquina de cafe del pasillo.' },
  },
  { id: 'pizarra', name: 'la pizarra', x: 110, y: 14, w: 150, h: 52, walkTo: { x: 150, y: 138 },
    look: '"EXAMEN MANANA. Tema 7: derivadas." Cada letra me da un escalofrio. No he abierto el libro.' },
  { id: 'ventana', name: 'la ventana', x: 12, y: 18, w: 60, h: 44, walkTo: { x: 44, y: 138 },
    look: 'El patio. La libertad esta a un cristal de distancia. Pero primero, el examen.' },
  { id: 'pupitres', name: 'los pupitres', x: 150, y: 104, w: 120, h: 30, walkTo: { x: 220, y: 140 },
    look: 'Pupitres rayados con corazones, formulas y algun insulto a Gema. La historia del aula.' },
];

const NPCS: NPC[] = [
  {
    id: 'unai', name: 'Unai', x: 74, y: 80, w: 28, h: 52,
    feet: { x: 88, y: 132 }, walkTo: { x: 110, y: 138 }, facing: 'right', color: [120, 200, 150],
    look: 'Unai, mi colega. Rubio, gafas y una sonrisa de "lo tengo todo pensado". Da un poco de miedo.',
    draw: drawUnai, dialogue: UNAI_DIALOGUE,
    accepts: {
      moneda: { line: 'No, la moneda guardatela tu, que es para la maquina. Yo pongo el cerebro, no el dinero.' },
      cafe: { line: 'Ese cafe no es para mi, crack. Es para Gema. Centrate.' },
    },
  },
];

const EXITS: Exit[] = [
  { id: 'toPasillo', name: 'el pasillo', x: 274, y: 36, w: 38, h: 60, walkTo: { x: 270, y: 138 }, to: 'pasillo', entry: { x: 40, y: 135 }, arrow: 'right' },
];

export const AULA: Room = {
  id: 'aula',
  build: buildAulaScene,
  dynamic: (ctx, state) => { if (!state.flags.took_moneda) drawMoneda(ctx); },
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 300, minY: 122, maxY: 140 },
  start: { x: 124, y: 136 },
};
