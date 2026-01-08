import { Position } from './position.model';

export interface Formation {
  name: string; // e.g., "4-3-3"
  positions: Position[]; // 10 outfield + 1 GK
  description?: string;
}
