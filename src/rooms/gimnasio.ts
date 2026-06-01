import { P, css, type RGB } from '../art/palette';
import { drawText } from '../art/font';
import { drawAlfonso } from '../art/actor';
import { ALFONSO_DIALOGUE } from '../content/dialogues';
import type { Room, NPC, Hotspot, Exit } from '../engine/types';

// ----------------------------------------------------------------
//  SALA 3 — EL GIMNASIO.
//  Alfonso, profe de gimnasia, y su lema: "el que lo intenta tiene
//  un 5". La moneda para el café está en el suelo, pero no se puede
//  coger sin haber INTENTADO el ejercicio (Usar las espalderas
//  levanta el flag intento_ejercicio, que desbloquea la moneda).
// ----------------------------------------------------------------

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

export function buildGimnasioScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 144;
  const ctx = cv.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  r(ctx, 0, 0, 320, 144, P.gymWall); // relleno base

  // pared del gimnasio
  r(ctx, 0, 0, 320, 100, P.gymWall);
  r(ctx, 0, 0, 320, 3, P.gymWallSh);
  r(ctx, 0, 60, 320, 2, P.gymWallSh);        // linea de pintura

  // banderines colgados arriba
  const bcol: RGB[] = [[200, 80, 70], [80, 130, 180], [210, 180, 80], [90, 150, 100]];
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = css(bcol[i % 4]);
    const bx = 8 + i * 22;
    ctx.beginPath(); ctx.moveTo(bx, 8); ctx.lineTo(bx + 14, 8); ctx.lineTo(bx + 7, 20); ctx.closePath(); ctx.fill();
  }
  r(ctx, 0, 7, 320, 1, [120, 110, 90]);      // cuerda

  // espalderas (wall bars) a la izquierda
  const ex = 40, ew = 76, eyTop = 26, eyBot = 100;
  r(ctx, ex, eyTop, 4, eyBot - eyTop, P.gymBarSh);          // montante izq
  r(ctx, ex + ew - 4, eyTop, 4, eyBot - eyTop, P.gymBarSh); // montante der
  for (let y = eyTop + 6; y < eyBot; y += 9) {              // peldanos
    r(ctx, ex, y, ew, 4, P.gymBar);
    r(ctx, ex, y, ew, 1, [212, 180, 120]);
  }

  // potro de salto (decorativo, centro-fondo)
  r(ctx, 150, 78, 40, 12, [150, 110, 70]);
  r(ctx, 150, 78, 40, 2, [180, 140, 96]);
  r(ctx, 156, 90, 4, 12, [70, 60, 50]);
  r(ctx, 180, 90, 4, 12, [70, 60, 50]);

  // suelo de parquet
  r(ctx, 0, 100, 320, 44, P.gymFloor);
  r(ctx, 0, 100, 320, 1, [216, 178, 120]);
  for (let y = 106; y < 144; y += 8) for (let x = ((y / 8) % 2) * 14; x < 320; x += 28) r(ctx, x, y, 26, 1, P.gymFloorSh);
  // lineas de pista pintadas en el suelo
  r(ctx, 30, 116, 260, 1, [210, 90, 80]);
  r(ctx, 110, 104, 1, 40, [80, 120, 180]);

  // colchonetas apiladas (derecha)
  r(ctx, 250, 86, 64, 16, P.gymMat);
  r(ctx, 250, 86, 64, 2, [110, 150, 190]);
  r(ctx, 250, 92, 64, 2, P.gymMatSh);
  r(ctx, 254, 78, 56, 10, P.gymMat);
  r(ctx, 254, 78, 56, 2, [110, 150, 190]);

  // puerta al pasillo (izquierda)
  r(ctx, 4, 42, 32, 58, [114, 86, 56]);
  r(ctx, 4, 42, 32, 4, [144, 110, 72]);
  r(ctx, 8, 46, 24, 52, [98, 74, 48]);
  r(ctx, 28, 68, 4, 4, P.winLit);

  // cartel motivacional
  r(ctx, 196, 26, 54, 20, [232, 228, 214]);
  drawText(ctx, 'SIN', 214, 30, [180, 70, 60], 1, null, 1);
  drawText(ctx, 'DOLOR', 206, 38, [180, 70, 60], 1, null, 1);

  return cv;
}

// La moneda en el suelo, visible siempre, pero sólo cogible tras el ejercicio.
export function drawMoneda(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = css(P.gymFloorSh);
  ctx.beginPath(); ctx.ellipse(176, 130, 4, 2, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = css([214, 188, 110]);
  ctx.beginPath(); ctx.arc(175, 129, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = css(P.sunCore);
  ctx.fillRect(174, 128, 1, 1);
}

const HOTSPOTS: Hotspot[] = [
  {
    // Usar las espalderas = "intentar el ejercicio". needs:[] se cumple solo,
    // así el motor levanta el flag sin pedir ningún objeto.
    id: 'espalderas', name: 'las espalderas', x: 40, y: 26, w: 76, h: 74, walkTo: { x: 80, y: 140 },
    look: 'Espalderas de madera, lisas de tanto mano sudada. Subir hasta arriba es para titanes. Yo con dos peldanos me conformo.',
    needs: [],
    responses: {
      Usar: 'Trepo dos peldanos, me tiemblan los brazos como flanes y bajo. "¡UN CINCO PARA ENEKO POR INTENTARLO!", grita Alfonso. Funciono.',
      Abrir: 'No se abren, se trepan. Venga, a intentarlo.',
    },
    flag: 'intento_ejercicio',
  },
  {
    id: 'moneda', name: 'una moneda', x: 168, y: 124, w: 16, h: 12, walkTo: { x: 176, y: 140 },
    look: 'Una moneda de 1 euro en el suelo del gimnasio. Alfonso no quita ojo: coger algo sin sudar aqui es pecado mortal.',
    pickup: { id: 'moneda', name: 'una moneda de 1 euro' },
    pickupIf: 'intento_ejercicio',
    pickupBlocked: 'Alfonso me fulmina con la mirada. "Sin sudar no hay premio". Primero tengo que intentar el ejercicio.',
    responses: { Coger: 'La pillo del suelo con disimulo. Moneda para la maquina de cafe.' },
  },
  { id: 'potro', name: 'el potro', x: 150, y: 78, w: 40, h: 24, walkTo: { x: 170, y: 140 },
    look: 'El potro de salto. La pesadilla de generaciones. Hoy paso: bastante tengo con las espalderas.' },
  { id: 'colchonetas', name: 'las colchonetas', x: 250, y: 76, w: 64, h: 26, walkTo: { x: 280, y: 140 },
    look: 'Colchonetas azules apiladas. Huelen a pies de mil alumnos. Un clasico inmortal del gimnasio.' },
];

const NPCS: NPC[] = [
  {
    id: 'alfonso', name: 'Alfonso', x: 210, y: 76, w: 30, h: 56,
    feet: { x: 224, y: 130 }, walkTo: { x: 200, y: 140 }, facing: 'left', color: [230, 170, 160],
    look: 'Alfonso, el profe de gimnasia. Chandal, silbato y brazos cruzados. Su filosofia cabe en una frase: el que lo intenta, aprueba.',
    draw: drawAlfonso, dialogue: ALFONSO_DIALOGUE,
    accepts: {
      cafe: { line: '¿Cafe? Aqui se bebe agua y se suda, chaval. Llevatelo.' },
    },
  },
];

const EXITS: Exit[] = [
  { id: 'toPasillo', name: 'el pasillo', x: 4, y: 38, w: 36, h: 62, walkTo: { x: 28, y: 138 }, to: 'pasillo', entry: { x: 100, y: 135 }, arrow: 'left' },
];

export const GIMNASIO: Room = {
  id: 'gimnasio',
  build: buildGimnasioScene,
  dynamic: (ctx, state) => { if (!state.flags.took_moneda) drawMoneda(ctx); },
  hotspots: HOTSPOTS,
  npcs: NPCS,
  exits: EXITS,
  walk: { minX: 16, maxX: 300, minY: 120, maxY: 140 },
  start: { x: 44, y: 135 },
};
