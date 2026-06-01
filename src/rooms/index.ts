import type { Room } from '../engine/types';
import { AULA } from './aula';
import { PASILLO } from './pasillo';
import { SALA } from './sala';

// Registra cada sala por su id. Los exits referencian estos ids.
export const ROOMS: Record<string, Room> = {
  aula: AULA,
  pasillo: PASILLO,
  sala: SALA,
};

// La sala en la que arranca el juego.
export const START_ROOM = 'aula';
