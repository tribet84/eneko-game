import { P, css, type RGB } from '../art/palette';
import { Pixels, rampPick, ditherPick } from '../art/dither';

function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}

// Pantalla de título de OPERACION GEMA: la fachada del colegio
// Corazonistas al atardecer, con su torre y su cruz, ventanas
// encendidas (donde Gema sigue corrigiendo) y el patio en sombra.
// El tercio superior queda despejado para que el logo se lea.
export function buildTitleScene(): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 200;
  const ctx = cv.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  // cielo de atardecer dithered
  const HOR = 150;
  const img = ctx.createImageData(320, HOR);
  const px = new Pixels(img, 320, HOR);
  const sky: RGB[] = [[40, 40, 78], [92, 64, 96], [168, 88, 84], [232, 150, 96], [248, 200, 138]];
  const glow: RGB = [255, 222, 150], core: RGB = [255, 246, 214];
  const SX = 250, SY = 120;
  for (let y = 0; y < HOR; y++) {
    for (let x = 0; x < 320; x++) {
      let c = rampPick(sky, y / HOR, x, y);
      const dx = x - SX, dy = (y - SY) * 1.4;
      const d = Math.sqrt(dx * dx + dy * dy);
      const g1 = 1 - d / 70; if (g1 > 0) c = ditherPick(c, glow, g1, x, y);
      const g2 = 1 - d / 22; if (g2 > 0) c = ditherPick(c, core, g2, x, y);
      px.set(x, y, c);
    }
  }
  ctx.putImageData(img, 0, 0);

  // fachada del colegio en sombra cálida
  const wall: RGB = [86, 64, 70], wallLit: RGB = [108, 82, 86], dk: RGB = [54, 40, 48];
  const baseY = 112;
  r(ctx, 0, baseY, 320, 200 - baseY, wall);
  r(ctx, 0, baseY, 320, 3, wallLit);

  // hileras de ventanas encendidas
  for (let row = 0; row < 3; row++) {
    for (let wx = 14; wx < 320; wx += 30) {
      const ly = baseY + 12 + row * 26;
      const lit = ((wx + row * 7) % 3) !== 0;
      r(ctx, wx, ly, 14, 16, dk);
      r(ctx, wx + 2, ly + 2, 10, 12, lit ? P.winLit : [50, 56, 70]);
      r(ctx, wx + 6, ly + 2, 2, 12, dk);    // cruceta
    }
  }

  // puerta principal
  r(ctx, 146, 168, 28, 32, dk);
  r(ctx, 150, 172, 20, 28, [40, 28, 34]);
  r(ctx, 159, 184, 3, 6, P.winLit);

  // torre central con tejado y cruz (Corazonistas)
  const tx = 150;
  r(ctx, tx, 70, 22, baseY - 70, wall);
  r(ctx, tx, 70, 22, 3, wallLit);
  r(ctx, tx + 7, 82, 8, 12, dk);            // ventanal de la torre
  r(ctx, tx + 8, 84, 6, 8, [60, 70, 90]);
  // tejado
  ctx.fillStyle = css(dk);
  ctx.beginPath(); ctx.moveTo(tx - 4, 70); ctx.lineTo(tx + 11, 54); ctx.lineTo(tx + 26, 70); ctx.closePath(); ctx.fill();
  // cruz
  r(ctx, tx + 10, 40, 2, 14, [40, 30, 36]);
  r(ctx, tx + 6, 44, 10, 2, [40, 30, 36]);

  // patio en sombra (primer plano)
  r(ctx, 0, 188, 320, 12, [34, 26, 32]);
  r(ctx, 0, 186, 320, 3, [46, 36, 42]);

  return cv;
}
