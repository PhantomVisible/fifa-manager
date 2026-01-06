import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  @Input() player!: Player;

  get rarity(): string {
  if (this.player.overall >= 90) return 'legendary';
  if (this.player.overall >= 85) return 'epic';
  if (this.player.overall >= 75) return 'rare';
  return 'common';
  }
  
}
