import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDragPreview, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { Player } from '../../../core/models/player.model';
import { PlayerMarkerComponent } from '../player-marker/player-marker.component';

@Component({
  selector: 'app-bench-panel',
  standalone: true,
  imports: [CommonModule, PlayerMarkerComponent, CdkDrag, CdkDropList, CdkDragPreview, CdkDragPlaceholder],
  template: `
    <div cdkDropList id="bench" [cdkDropListData]="players" class="flex flex-wrap gap-2 p-1 min-h-[80px]"
      [cdkDropListConnectedTo]="[]">

      @for (player of players; track player.sofifa_id) {
        <div cdkDrag [cdkDragData]="player"
          class="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform touch-none">
          <app-player-marker [player]="player" [isBench]="true" (playerClick)="onPlayerClick($event)"></app-player-marker>

          <div *cdkDragPreview class="opacity-90">
            <app-player-marker [player]="player" [isBench]="true"></app-player-marker>
          </div>
          <div *cdkDragPlaceholder class="w-20 h-16 rounded-lg bg-white/5 border border-white/10"></div>
        </div>
      }

      @if (players.length === 0) {
        <div class="w-full h-16 flex items-center justify-center text-slate-500 text-xs italic">
          No players found. Use filters above.
        </div>
      }
    </div>
  `
})
export class BenchPanelComponent {
  @Input() players: Player[] = [];
  @Output() playerClick = new EventEmitter<Player>();

  onPlayerClick(player: Player) {
    console.log('Bench panel forwarding player click:', player.short_name);
    this.playerClick.emit(player);
  }
}
