import { P, css, type RGB } from '../art/palette';

type Draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => void;

// Cada icono se dibuja dentro de un hueco de inventario de 20x20 anclado en (x,y).
// Mantenlos gordos y con mucho contraste para que se lean a tamaño diminuto.
// Una entrada por cada item que tus salas puedan otorgar.
export const ITEMS: Record<string, { name: string; draw: Draw }> = {
  // Moneda de 1 euro para la máquina de café del pasillo.
  moneda: {
    name: 'una moneda de 1 euro',
    draw: (ctx, x, y) => {
      ctx.fillStyle = css(P.stoneShadow);
      ctx.beginPath(); ctx.arc(x + 10, y + 11, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = css([198, 170, 92]);           // borde dorado
      ctx.beginPath(); ctx.arc(x + 10, y + 10, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = css([224, 200, 120]);           // centro plateado-dorado del euro
      ctx.beginPath(); ctx.arc(x + 10, y + 10, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = css(P.sunCore);
      ctx.fillRect(x + 7, y + 6, 2, 2);               // brillo
      ctx.fillStyle = css([150, 120, 70]);
      ctx.fillRect(x + 9, y + 7, 2, 6);               // "1" estilizado
    },
  },

  // Vaso de café de máquina, bien cargado, para Gema.
  cafe: {
    name: 'un cafe de maquina',
    draw: (ctx, x, y) => {
      ctx.fillStyle = css([232, 228, 220]);           // vaso de plástico
      ctx.beginPath();
      ctx.moveTo(x + 5, y + 6); ctx.lineTo(x + 15, y + 6);
      ctx.lineTo(x + 13, y + 18); ctx.lineTo(x + 7, y + 18); ctx.closePath(); ctx.fill();
      ctx.fillStyle = css([62, 38, 24]);              // café
      ctx.fillRect(x + 6, y + 7, 8, 3);
      ctx.fillStyle = css([150, 145, 138]);           // sombra del vaso
      ctx.fillRect(x + 11, y + 8, 2, 9);
      ctx.fillStyle = css([200, 196, 190]);           // brillo
      ctx.fillRect(x + 7, y + 8, 1, 8);
      // vapor
      ctx.fillStyle = css([220, 220, 220]);
      ctx.fillRect(x + 8, y + 3, 1, 2); ctx.fillRect(x + 11, y + 2, 1, 2);
    },
  },

  // Pendrive con el examen fácil del año pasado.
  usb: {
    name: 'el pendrive de Unai',
    draw: (ctx, x, y) => {
      ctx.fillStyle = css(P.black);                   // contorno
      ctx.fillRect(x + 3, y + 7, 13, 7);
      ctx.fillStyle = css([60, 70, 120]);             // cuerpo azul
      ctx.fillRect(x + 4, y + 8, 11, 5);
      ctx.fillStyle = css([120, 130, 180]);           // brillo
      ctx.fillRect(x + 5, y + 9, 6, 1);
      ctx.fillStyle = css([180, 180, 190]);           // conector metálico
      ctx.fillRect(x + 14, y + 9, 4, 3);
      ctx.fillStyle = css(P.winLit);                  // led / capuchón
      ctx.fillRect(x + 5, y + 10, 1, 2);
    },
  },
};

export function makeItem(id: string) {
  const it = ITEMS[id];
  return { id, name: it ? it.name : id, draw: it ? it.draw : undefined };
}
