import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../core/models/player.model';
import { getPositionRating, getRatingColor } from '../../../core/utils/player-rating.util';
import { getPlayerImageUrl } from '../../../core/utils/player-image.util';

@Component({
  selector: 'app-player-marker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isBench" class="w-24 bg-slate-800 rounded-lg p-2 border border-slate-700 hover:border-green-500 transition-colors">
      <div class="text-center">
        <!-- Player Photo -->
        <div class="w-16 h-16 mx-auto mb-2 relative group">
          <img [src]="playerImageUrl" 
               [alt]="player.short_name"
               class="w-full h-full object-contain drop-shadow-lg transition-transform group-hover:scale-110"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
          
          <!-- Fallback Rating Circle (hidden by default) -->
          <div class="hidden absolute inset-0 rounded-full items-center justify-center text-white font-bold text-sm"
               [ngClass]="ratingColorClass">
            {{ displayRating }}
          </div>
          
          <!-- Rating Badge -->
          <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md border border-slate-900"
               [ngClass]="ratingColorClass">
            {{ displayRating }}
          </div>
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
      <div class="w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden bg-slate-800"
        [ngClass]="ratingColorClass">
        <!-- On pitch we keep the rating circle style, but maybe we can add face later if user asks. Current request only specified bench and popup. 
             Wait, user said "every player... displayed while they are on the bench or when I open their details popup". 
             Let's keep pitch as positions/ratings for now as it's cleaner for formation view.
        -->
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

  get playerImageUrl(): string {
    return getPlayerImageUrl(this.player.sofifa_id);
  }
}
