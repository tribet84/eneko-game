import { P, css, type RGB } from './palette';

// Helpers de pixel compartidos por todos los personajes.
// `px` = rect plano; `blk` = rect con contorno oscuro de 1px (se lee sobre cualquier fondo).
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB) {
  ctx.fillStyle = css(c);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
}
function blk(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: RGB, o: RGB = P.black) {
  ctx.fillStyle = css(o);
  ctx.fillRect(x | 0, y | 0, w | 0, h | 0);
  ctx.fillStyle = css(c);
  ctx.fillRect((x | 0) + 1, (y | 0) + 1, Math.max(0, (w | 0) - 2), Math.max(0, (h | 0) - 2));
}

// ----------------------------------------------------------------
//  ENEKO — el jugador. Alumno de 4º de la ESO con sudadera granate
//  del cole y vaqueros. Dibujado de los pies hacia arriba en (fx,fy),
//  donde (fx,fy) es el centro de los pies sobre el suelo. `facing`
//  espeja el sprite; `t` (segundos) mueve el ciclo de andar.
// ----------------------------------------------------------------
export function drawActor(
  ctx: CanvasRenderingContext2D, fx: number, fy: number,
  facing: 'left' | 'right' = 'right', moving = false, t = 0, idleBob = 0,
) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }

  const swing = moving ? Math.round(Math.sin(t * 11) * 2) : 0;
  const aswing = moving ? Math.round(Math.sin(t * 11) * 1.5) : 0;
  const bob = moving ? (Math.sin(t * 11) > 0 ? 1 : 0) : Math.round(idleBob);

  // piernas (vaqueros) + zapatillas
  blk(ctx, cx - 6 + swing, fyR - 20, 5, 16, P.enekoJeans);
  blk(ctx, cx + 1 - swing, fyR - 20, 5, 16, P.enekoJeans);
  px(ctx, cx - 5 + swing, fyR - 19, 2, 14, P.enekoJeansSh);
  px(ctx, cx + 2 - swing, fyR - 19, 2, 14, P.enekoJeansSh);
  blk(ctx, cx - 7 + swing, fyR - 5, 7, 5, [236, 236, 236]);  // zapatillas blancas
  blk(ctx, cx + 0 - swing, fyR - 5, 7, 5, [236, 236, 236]);

  // torso (sudadera con capucha) + bolsillo
  const ty = fyR - 38 + bob;
  blk(ctx, cx - 7, ty, 14, 19, P.enekoHood);
  px(ctx, cx - 6, ty + 1, 3, 17, P.enekoHoodSh);
  px(ctx, cx + 4, ty + 1, 2, 17, P.enekoHoodSh);
  px(ctx, cx - 4, ty + 11, 8, 4, P.enekoHoodSh);            // bolsillo canguro
  px(ctx, cx - 1, ty - 1, 2, 4, P.enekoHoodSh);             // cordón capucha

  // brazos
  blk(ctx, cx - 10, ty + 2 + aswing, 4, 13, P.enekoHood);
  blk(ctx, cx + 6, ty + 2 - aswing, 4, 13, P.enekoHood);
  px(ctx, cx - 10, ty + 13 + aswing, 4, 3, P.skin);
  px(ctx, cx + 6, ty + 13 - aswing, 4, 3, P.skin);

  // cuello + cabeza
  px(ctx, cx - 2, ty - 2, 4, 3, P.skin);
  const hy = fyR - 50 + bob;
  blk(ctx, cx - 5, hy, 10, 11, P.skin);
  px(ctx, cx - 4, hy + 1, 3, 9, P.skinShadow);
  px(ctx, cx - 5, hy - 1, 11, 3, P.enekoHair);              // pelo corto castaño
  px(ctx, cx - 6, hy, 3, 5, P.enekoHair);
  px(ctx, cx + 3, hy - 1, 3, 4, P.enekoHair);
  px(ctx, cx + 1, hy + 4, 1, 2, P.black);                  // ojo
  px(ctx, cx + 1, hy + 8, 3, 1, P.skinShadow);             // boca (medio sonrisa pícara)

  ctx.restore();
}

// ----------------------------------------------------------------
//  UNAI — el colega cerebro del plan. Sudadera verde, rubio, gafas.
//  Apoyado, manos en los bolsillos, con cara de "yo lo tengo todo
//  pensado". Respira con un Math.sin lento.
// ----------------------------------------------------------------
export function drawUnai(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'right', t = 0) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  const bob = Math.sin(t * 1.6) > 0.9 ? 1 : 0;
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }

  // piernas + zapatillas
  blk(ctx, cx - 6, fyR - 18, 5, 16, P.enekoJeans);
  blk(ctx, cx + 1, fyR - 18, 5, 16, P.enekoJeans);
  blk(ctx, cx - 7, fyR - 4, 7, 4, [40, 40, 44]);
  blk(ctx, cx + 0, fyR - 4, 7, 4, [40, 40, 44]);

  // torso (sudadera verde) + manos metidas en el bolsillo
  const ty = fyR - 36 + bob;
  blk(ctx, cx - 7, ty, 14, 20, P.unaiHood);
  px(ctx, cx - 6, ty + 1, 3, 18, P.unaiHoodSh);
  px(ctx, cx - 4, ty + 11, 8, 5, P.unaiHoodSh);             // bolsillo
  px(ctx, cx - 4, ty + 12, 3, 3, P.skin);                  // mano izq dentro
  px(ctx, cx + 1, ty + 12, 3, 3, P.skin);                  // mano der dentro
  // brazos pegados
  px(ctx, cx - 9, ty + 2, 3, 11, P.unaiHood);
  px(ctx, cx + 6, ty + 2, 3, 11, P.unaiHood);

  // cuello + cabeza
  px(ctx, cx - 2, ty - 2, 4, 3, P.skin);
  const hy = fyR - 48 + bob;
  blk(ctx, cx - 5, hy, 11, 11, P.skin);
  px(ctx, cx - 4, hy + 1, 3, 9, P.skinShadow);
  px(ctx, cx - 5, hy - 2, 12, 4, P.unaiHair);              // pelo rubio con flequillo
  px(ctx, cx - 5, hy + 1, 2, 4, P.unaiHair);
  px(ctx, cx + 4, hy + 1, 2, 4, P.unaiHair);
  // gafas (montura oscura) sobre los ojos
  px(ctx, cx - 3, hy + 3, 3, 3, [40, 40, 44]);
  px(ctx, cx + 2, hy + 3, 3, 3, [40, 40, 44]);
  px(ctx, cx - 2, hy + 4, 1, 1, P.black);
  px(ctx, cx + 3, hy + 4, 1, 1, P.black);
  px(ctx, cx + 0, hy + 4, 2, 1, [40, 40, 44]);             // puente de las gafas
  px(ctx, cx - 1, hy + 8, 3, 1, P.skinShadow);             // boca

  ctx.restore();
}

// ----------------------------------------------------------------
//  GEMA — la profesora. Rebeca azul marino, camisa clara, melena
//  castaña. Más alta y compuesta. Tras tomar el café se la dibuja
//  igual: la magia ocurre en el diálogo, no en el sprite.
// ----------------------------------------------------------------
export function drawGema(ctx: CanvasRenderingContext2D, fx: number, fy: number, facing: 'left' | 'right' = 'left', t = 0) {
  const cx = Math.round(fx);
  const fyR = Math.round(fy);
  const bob = Math.sin(t * 1.4) > 0.95 ? 1 : 0;
  ctx.save();
  if (facing === 'left') { ctx.translate(cx * 2, 0); ctx.scale(-1, 1); }

  // falda / piernas + zapatos
  blk(ctx, cx - 7, fyR - 20, 14, 12, P.gemaCoatSh);        // falda recta
  blk(ctx, cx - 5, fyR - 10, 4, 8, [60, 50, 46]);          // piernas
  blk(ctx, cx + 1, fyR - 10, 4, 8, [60, 50, 46]);
  blk(ctx, cx - 6, fyR - 3, 5, 3, P.black);                // zapatos
  blk(ctx, cx + 1, fyR - 3, 5, 3, P.black);

  // torso (rebeca abierta sobre camisa)
  const ty = fyR - 40 + bob;
  blk(ctx, cx - 7, ty, 14, 22, P.gemaCoat);
  px(ctx, cx - 2, ty + 1, 4, 20, P.gemaBlouse);            // camisa por delante
  px(ctx, cx - 7, ty + 1, 2, 20, P.gemaCoatSh);
  px(ctx, cx + 5, ty + 1, 2, 20, P.gemaCoatSh);
  // brazos
  blk(ctx, cx - 10, ty + 2, 4, 14, P.gemaCoat);
  blk(ctx, cx + 6, ty + 2, 4, 14, P.gemaCoat);
  px(ctx, cx - 10, ty + 14, 4, 3, P.skin);
  px(ctx, cx + 6, ty + 14, 4, 3, P.skin);

  // cuello + cabeza
  px(ctx, cx - 2, ty - 2, 4, 3, P.skin);
  const hy = fyR - 52 + bob;
  blk(ctx, cx - 5, hy, 10, 11, P.skin);
  px(ctx, cx - 4, hy + 1, 3, 9, P.skinShadow);
  // melena castaña a los lados
  px(ctx, cx - 6, hy - 2, 12, 4, P.gemaHair);
  px(ctx, cx - 7, hy, 3, 9, P.gemaHair);
  px(ctx, cx + 5, hy, 3, 9, P.gemaHair);
  px(ctx, cx - 7, hy + 6, 2, 3, P.gemaHairSh);
  px(ctx, cx + 6, hy + 6, 2, 3, P.gemaHairSh);
  px(ctx, cx - 2, hy + 4, 1, 2, P.black);                  // ojos
  px(ctx, cx + 2, hy + 4, 1, 2, P.black);
  px(ctx, cx - 1, hy + 8, 3, 1, P.skinShadow);             // boca

  ctx.restore();
}
