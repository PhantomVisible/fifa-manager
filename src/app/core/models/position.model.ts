export interface Position {
  x: number; // 0-1, relative to pitch width
  y: number; // 0-1, relative to pitch height
  role: string; // e.g., "LB", "CM", "RW"
  zone: string; // e.g., "defense", "midfield", "attack"
}
