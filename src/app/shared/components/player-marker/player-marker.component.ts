import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../core/models/player.model';
import { getPositionRating, getRatingColor } from '../../../core/utils/player-rating.util';

@Component({
  selector: 'app-player-marker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isBench" class="w-24 bg-slate-800 rounded-lg p-2 border border-slate-700 hover:border-green-500 transition-colors">
      <div class="text-center">
        <div class="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white font-bold text-sm mb-1"
          [ngClass]="ratingColorClass">
          {{ displayRating }}
        </div>
        <p class="text-[10px] font-semibold text-white truncate" [title]="player.short_name">{{ player.short_name }}</p>
        <p class="text-[8px] text-slate-400 truncate mb-1">{{ primaryPosition }}</p>
        <button 
          (click)="onDetailsClick($event)"
          class="w-full text-[9px] py-0.5 px-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors">
          Details
        </button>
      </div>
    </div>
    
    <div *ngIf="!isBench" class="relative cursor-pointer" (click)="onDetailsClick($event)">
      <div class="w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
        [ngClass]="ratingColorClass">
        <span class="text-white font-bold text-sm">{{ displayRating }}</span>
      </div>
      <p class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-white bg-black/70 px-1 rounded whitespace-nowrap">
        {{ player.short_name }}
      </p>
    </div>
  `
})
export class PlayerMarkerComponent {
  @Input() player!: Player;
  @Input() position: string = '';
  @Input() isBench = false;
  @Output() playerClick = new EventEmitter<Player>();

  onDetailsClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.playerClick.emit(this.player);
  }

  get displayRating(): number {
    if (!this.isBench && this.position) {
      return getPositionRating(this.player, this.position);
    }
    return this.player?.overall || 0;
  }

  get ratingColorClass(): string {
    return 'bg-gradient-to-br ' + getRatingColor(this.displayRating);
  }

  get primaryPosition(): string {
    return this.player?.player_positions?.split(',')[0]?.trim() || '';
  }
}
