import { Injectable, signal } from '@angular/core';
import { Formation } from '../models/formation.model';
import { Position } from '../models/position.model';

const FORMATIONS: Formation[] = [
  {
    name: '4-3-3',
    positions: [
      { x: 0.5, y: 0.95, role: 'GK', zone: 'goalkeeper' },
      { x: 0.12, y: 0.8, role: 'LB', zone: 'defense' },
      { x: 0.32, y: 0.8, role: 'LCB', zone: 'defense' },
      { x: 0.68, y: 0.8, role: 'RCB', zone: 'defense' },
      { x: 0.88, y: 0.8, role: 'RB', zone: 'defense' },
      { x: 0.22, y: 0.6, role: 'LM', zone: 'midfield' },
      { x: 0.5, y: 0.6, role: 'CM', zone: 'midfield' },
      { x: 0.78, y: 0.6, role: 'RM', zone: 'midfield' },
      { x: 0.18, y: 0.35, role: 'LW', zone: 'attack' },
      { x: 0.5, y: 0.25, role: 'ST', zone: 'attack' },
      { x: 0.82, y: 0.35, role: 'RW', zone: 'attack' }
    ]
  },
  {
    name: '4-4-2',
    positions: [
      { x: 0.5, y: 0.95, role: 'GK', zone: 'goalkeeper' },
      { x: 0.12, y: 0.8, role: 'LB', zone: 'defense' },
      { x: 0.32, y: 0.8, role: 'LCB', zone: 'defense' },
      { x: 0.68, y: 0.8, role: 'RCB', zone: 'defense' },
      { x: 0.88, y: 0.8, role: 'RB', zone: 'defense' },
      { x: 0.18, y: 0.6, role: 'LM', zone: 'midfield' },
      { x: 0.38, y: 0.6, role: 'LCM', zone: 'midfield' },
      { x: 0.62, y: 0.6, role: 'RCM', zone: 'midfield' },
      { x: 0.82, y: 0.6, role: 'RM', zone: 'midfield' },
      { x: 0.35, y: 0.3, role: 'LS', zone: 'attack' },
      { x: 0.65, y: 0.3, role: 'RS', zone: 'attack' }
    ]
  },
  {
    name: '3-5-2',
    positions: [
      { x: 0.5, y: 0.95, role: 'GK', zone: 'goalkeeper' },
      { x: 0.2, y: 0.8, role: 'LCB', zone: 'defense' },
      { x: 0.5, y: 0.8, role: 'CB', zone: 'defense' },
      { x: 0.8, y: 0.8, role: 'RCB', zone: 'defense' },
      { x: 0.1, y: 0.6, role: 'LWB', zone: 'midfield' },
      { x: 0.3, y: 0.6, role: 'LCM', zone: 'midfield' },
      { x: 0.5, y: 0.6, role: 'CM', zone: 'midfield' },
      { x: 0.7, y: 0.6, role: 'RCM', zone: 'midfield' },
      { x: 0.9, y: 0.6, role: 'RWB', zone: 'midfield' },
      { x: 0.35, y: 0.3, role: 'LS', zone: 'attack' },
      { x: 0.65, y: 0.3, role: 'RS', zone: 'attack' }
    ]
  },
  {
    name: '4-3-2-1',
    positions: [
      { x: 0.5, y: 0.95, role: 'GK', zone: 'goalkeeper' },
      { x: 0.12, y: 0.8, role: 'LB', zone: 'defense' },
      { x: 0.32, y: 0.8, role: 'LCB', zone: 'defense' },
      { x: 0.68, y: 0.8, role: 'RCB', zone: 'defense' },
      { x: 0.88, y: 0.8, role: 'RB', zone: 'defense' },
      { x: 0.22, y: 0.6, role: 'LCM', zone: 'midfield' },
      { x: 0.5, y: 0.6, role: 'CM', zone: 'midfield' },
      { x: 0.78, y: 0.6, role: 'RCM', zone: 'midfield' },
      { x: 0.4, y: 0.4, role: 'LAM', zone: 'attack' },
      { x: 0.6, y: 0.4, role: 'RAM', zone: 'attack' },
      { x: 0.5, y: 0.2, role: 'ST', zone: 'attack' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class FormationService {
  formations = FORMATIONS;
  currentFormation = signal<Formation>(FORMATIONS[0]);

  getFormations(): Formation[] {
    return this.formations;
  }

  setFormation(name: string): void {
    const found = this.formations.find(f => f.name === name);
    if (found) this.currentFormation.set(found);
  }

  getCurrentFormation(): Formation {
    return this.currentFormation();
  }

  getPositions(): Position[] {
    return this.currentFormation().positions;
  }
}
