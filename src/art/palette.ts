// Curated warm-Mediterranean VGA-ish palette for the classic 90s adventure look.
// Every colour in the game is picked from here to keep the painted-VGA cohesion.
// Add or retune entries per game, but keep the set small for a unified mood.
export type RGB = [number, number, number];

export const P = {
  // --- sky (warm late afternoon) ---
  skyTop:     [38, 60, 96]   as RGB,
  skyUpper:   [66, 92, 122]  as RGB,
  skyMid:     [126, 144, 158] as RGB,
  skyLow:     [200, 176, 150] as RGB,
  skyHorizon: [242, 202, 150] as RGB,
  sunGlow:    [255, 230, 172] as RGB,
  sunCore:    [255, 246, 216] as RGB,

  // --- sea ---
  seaFar:   [150, 170, 170] as RGB,
  seaMid:   [84, 126, 136]  as RGB,
  seaNear:  [46, 92, 104]   as RGB,
  seaDeep:  [28, 62, 76]    as RGB,
  seaGlint: [212, 228, 216] as RGB,

  // --- hills / distant silhouette ---
  hillHaze: [98, 122, 124] as RGB,
  hillMid:  [64, 92, 86]   as RGB,
  hillDark: [42, 64, 58]   as RGB,
  hillLit:  [112, 130, 102] as RGB,

  // --- castle stone ---
  stoneLit:    [214, 196, 152] as RGB,
  stone:       [178, 158, 122] as RGB,
  stoneShadow: [126, 108, 80]  as RGB,

  // --- buildings ---
  wallLit:    [226, 196, 150] as RGB,
  wall:       [198, 164, 118] as RGB,
  wallShadow: [150, 120, 82]  as RGB,
  roofLit:    [200, 114, 76]  as RGB,
  roof:       [170, 88, 56]   as RGB,
  roofShadow: [126, 60, 40]   as RGB,
  winDark:    [54, 44, 42]    as RGB,
  winLit:     [242, 196, 96]  as RGB,

  // --- wood / dock / boats ---
  woodLit:    [170, 118, 74] as RGB,
  wood:       [138, 90, 56]  as RGB,
  woodDark:   [96, 60, 36]   as RGB,
  woodShadow: [62, 38, 22]   as RGB,

  // --- cloth / rope ---
  sail:       [228, 214, 182] as RGB,
  sailShadow: [186, 168, 136] as RGB,
  rope:       [198, 170, 122] as RGB,
  flagRed:    [192, 64, 56]   as RGB,

  // --- misc ---
  cloud:       [244, 230, 208] as RGB,
  black:       [26, 20, 24]    as RGB,

  // --- panel / UI ---
  panelWood:     [80, 54, 38]   as RGB,
  panelWoodLit:  [114, 80, 56]  as RGB,
  panelWoodDark: [48, 30, 20]   as RGB,
  parchment:     [226, 208, 170] as RGB,
  inkLight:      [244, 226, 170] as RGB,
  verbIdle:      [208, 182, 132] as RGB,
  verbHot:       [250, 228, 152] as RGB,

  // --- player character ---
  skin:       [234, 186, 146] as RGB,
  skinShadow: [198, 146, 106] as RGB,
  hair:       [208, 164, 90]  as RGB,
  hairShadow: [168, 124, 60]  as RGB,
  shirt:      [230, 224, 208] as RGB,
  shirtShadow:[184, 176, 158] as RGB,
  pants:      [74, 80, 98]    as RGB,
  pantsShadow:[52, 56, 72]    as RGB,
  boots:      [80, 52, 34]    as RGB,
  belt:       [122, 80, 48]   as RGB,

  // --- OPERACION GEMA: instituto Corazonistas ---
  // Eneko: sudadera granate (chándal del cole), vaqueros.
  enekoHood:    [150, 52, 56]  as RGB,
  enekoHoodSh:  [110, 36, 42]  as RGB,
  enekoHair:    [60, 44, 34]   as RGB,
  enekoJeans:   [70, 86, 118]  as RGB,
  enekoJeansSh: [50, 62, 90]   as RGB,
  // Unai: sudadera verde con capucha, pelo rubio, gafas.
  unaiHood:     [70, 120, 96]  as RGB,
  unaiHoodSh:   [48, 88, 70]   as RGB,
  unaiHair:     [206, 176, 110] as RGB,
  // Gema: profe, rebeca azul marino, camisa clara, melena castaña.
  gemaCoat:     [70, 78, 110]  as RGB,
  gemaCoatSh:   [50, 56, 84]   as RGB,
  gemaBlouse:   [222, 214, 224] as RGB,
  gemaHair:     [120, 84, 56]  as RGB,
  gemaHairSh:   [88, 60, 40]   as RGB,
  // mobiliario escolar
  schoolGreen:  [104, 132, 96]  as RGB,  // pizarra verde
  schoolGreenD: [76, 100, 70]   as RGB,
  deskWood:     [186, 150, 104] as RGB,
  deskWoodSh:   [150, 116, 76]  as RGB,
  tile:         [196, 192, 182] as RGB,  // suelo de baldosas
  tileD:        [172, 168, 158] as RGB,
  lockerBlue:   [108, 130, 150] as RGB,
  lockerBlueD:  [80, 100, 120]  as RGB,

  // --- personajes nuevos ---
  // Blanca: companera china, estudiosa. Pelo negro, rebeca mostaza.
  blancaHair:   [38, 32, 36]   as RGB,
  blancaHairLt: [70, 60, 64]   as RGB,
  blancaTop:    [214, 176, 84] as RGB,
  blancaTopSh:  [176, 138, 56] as RGB,
  blancaSkin:   [240, 206, 168] as RGB,
  blancaSkinSh: [206, 168, 130] as RGB,
  // Pantxo: profe cantante, camisa morada vistosa, bigote.
  pantxoShirt:  [128, 78, 132] as RGB,
  pantxoShirtSh:[96, 54, 100]  as RGB,
  pantxoHair:   [70, 56, 44]   as RGB,
  pantxoTie:    [200, 80, 70]  as RGB,
  // Alfonso: profe de gimnasia, chandal granate y blanco, silbato.
  alfTrack:     [156, 56, 52]  as RGB,
  alfTrackSh:   [118, 40, 38]  as RGB,
  alfStripe:    [228, 224, 216] as RGB,
  alfHair:      [60, 52, 46]   as RGB,
  // gimnasio: espalderas de madera, colchonetas, suelo de parquet
  gymWall:      [196, 186, 158] as RGB,
  gymWallSh:    [172, 160, 132] as RGB,
  gymBar:       [188, 150, 96]  as RGB,
  gymBarSh:     [150, 116, 70]  as RGB,
  gymMat:       [70, 110, 150]  as RGB,
  gymMatSh:     [52, 86, 120]   as RGB,
  gymFloor:     [196, 158, 104] as RGB,
  gymFloorSh:   [170, 132, 82]  as RGB,
};

export function css(c: RGB): string {
  return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
}

export function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}
