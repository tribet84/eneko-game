// ============================================================
//  GAME CONFIG — OPERACIÓN GEMA
//  Una aventura gráfica point-and-click sobre Eneko, alumno de
//  4º de la ESO en el colegio Corazonistas, que tiene que ablandar
//  a su profesora Gema para que el examen sea fácil, con la ayuda
//  de su colega Unai.
//  El motor (src/engine, src/art, src/scumm, src/audio, src/main.ts)
//  es genérico — el juego vive en este archivo y en src/rooms,
//  src/content y src/screens.
// ============================================================

export const CONFIG = {
  // --- Title screen text ---
  titleSmall: 'OPERACION',           // línea pequeña arriba (escala 2)
  title: 'GEMA',                     // logo grande (escala 4 — corto, sin tildes en mayúsculas)
  subtitle: 'Como ablandar a tu profe de 4 de la ESO',
  credit: 'una comedia gamberra hecha con pointclick-kit',

  // --- Per-scene music ---
  // Map de room id -> tema ('town' | 'gate' | 'sardana' | 'medieval').
  // El jugador puede cambiarlo desde el selector de canciones del juego.
  roomTheme: { aula: 'town', pasillo: 'gate', gimnasio: 'sardana', sala: 'medieval' } as Record<string, string>,
  defaultTheme: 'town',

  // --- Save slot (localStorage). Único por juego. ---
  saveKey: 'operacion_gema_save_v1',

  // --- About / legal panel (engranaje -> Acerca de). Líneas ~40 chars. ---
  aboutTitle: 'OPERACION GEMA',
  about: [
    'Eneko tiene examen de Gema y no ha',
    'tocado un libro. Con su colega Unai',
    'monta un plan: un cafe, un cambiazo',
    'y mucha cara dura.',
    '',
    'Comedia escolar de ficcion. Cualquier',
    'parecido con tu instituto es pura',
    'mala conciencia.',
    '',
    '(c) 2026 - contenido original.',
    'Hecho con pointclick-kit.',
  ],
};
