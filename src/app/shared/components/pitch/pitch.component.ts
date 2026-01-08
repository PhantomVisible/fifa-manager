import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropList, CdkDrag, CdkDragPreview, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { Position } from '../../../core/models/position.model';
import { Player } from '../../../core/models/player.model';
import { PlayerMarkerComponent } from '../player-marker/player-marker.component';

@Component({
  selector: 'app-pitch',
  standalone: true,
  imports: [CommonModule, PlayerMarkerComponent, CdkDropList, CdkDrag, CdkDragPreview, CdkDragPlaceholder],
  template: `
    <div class="relative w-full aspect-[16/10] max-h-[70vh] bg-gradient-to-b from-emerald-600 to-green-700 rounded-xl shadow-2xl overflow-hidden border-4 border-slate-800 ring-1 ring-white/20 select-none">

      <!-- Pitch Markings -->
      <div class="absolute inset-0 pointer-events-none opacity-50">
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-white -translate-y-1/2"></div>
        <div class="absolute top-1/2 left-1/2 w-28 h-28 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute top-0 left-1/2 w-[50%] h-[18%] border-b-2 border-x-2 border-white -translate-x-1/2"></div>
        <div class="absolute bottom-0 left-1/2 w-[50%] h-[18%] border-t-2 border-x-2 border-white -translate-x-1/2"></div>
        <div class="absolute top-0 left-1/2 w-[25%] h-[8%] border-b-2 border-x-2 border-white -translate-x-1/2"></div>
        <div class="absolute bottom-0 left-1/2 w-[25%] h-[8%] border-t-2 border-x-2 border-white -translate-x-1/2"></div>
        <div class="absolute top-0 left-1/2 w-16 h-1.5 bg-white/60 -translate-x-1/2"></div>
        <div class="absolute bottom-0 left-1/2 w-16 h-1.5 bg-white/60 -translate-x-1/2"></div>
      </div>

      <!-- Player Positions -->
      <ng-container *ngFor="let pos of positions; let i = index">
        <div cdkDropList [id]="'pos-' + i" [cdkDropListData]="[players[i]]" (cdkDropListDropped)="drop.emit($event)"
          class="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
          [style.left.%]="pos.x * 100" [style.top.%]="pos.y * 100">

          <!-- Empty Slot -->
          <div *ngIf="!players[i]" class="w-10 h-10 rounded-full bg-black/40 border-2 border-dashed border-white/40 flex items-center justify-center">
            <span class="text-[9px] text-white/80 font-bold">{{ pos.role }}</span>
          </div>

          <!-- Player on Slot -->
          <div *ngIf="players[i] as player" class="relative">
            <div cdkDrag [cdkDragData]="player" class="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
              <app-player-marker [player]="player" [position]="pos.role" (playerClick)="playerClick.emit($event)"></app-player-marker>
              <div *cdkDragPreview class="scale-110 opacity-90">
                <app-player-marker [player]="player" [position]="pos.role"></app-player-marker>
              </div>
              <div *cdkDragPlaceholder class="w-10 h-10 rounded-full bg-white/20 border border-white/30"></div>
            </div>
            <!-- Remove button -->
            <button 
              (click)="onRemovePlayer(i, $event)"
              class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center shadow z-20"
              title="Remove player">
              <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class PitchComponent {
  @Input() positions: Position[] = [];
  @Input() players: (Player | null)[] = [];
  @Input() editMode = false;
  @Output() drop = new EventEmitter<any>();
  @Output() playerClick = new EventEmitter<Player>();
  @Output() removePlayer = new EventEmitter<number>();

  onRemovePlayer(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.removePlayer.emit(index);
  }
}
