import { Component, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormationService } from '../../core/services/formation.service';
import { PlayerDataService } from '../../core/services/player-data.service';
import { SessionStateService } from '../../core/services/session-state.service';
import { Player } from '../../core/models/player.model';
import { PitchComponent } from '../../shared/components/pitch/pitch.component';
import { BenchPanelComponent } from '../../shared/components/bench-panel/bench-panel.component';
import { SearchFilterComponent } from '../../shared/components/search-filter/search-filter.component';
import { PlayerDetailsComponent } from '../../shared/components/player-details/player-details.component';

@Component({
  selector: 'app-tactical-board',
  standalone: true,
  imports: [
    CommonModule,
    PitchComponent,
    BenchPanelComponent,
    SearchFilterComponent,
    PlayerDetailsComponent,
    CdkDropListGroup
  ],
  templateUrl: './tactical-board.component.html',
  styleUrl: './tactical-board.component.css'
})
export class TacticalBoardComponent {
  private formationService = inject(FormationService);
  private playerDataService = inject(PlayerDataService);
  private sessionState = inject(SessionStateService);

  editMode = signal(false);
  formation = this.formationService.currentFormation;
  positions = computed(() => this.formation().positions);

  // State
  playersOnPitch = signal<(Player | null)[]>(
    this.sessionState.load<(Player | null)[]>('playersOnPitch') ?? []
  );
  benchPlayers = this.playerDataService.filteredPlayers;

  // Player details popup
  selectedPlayer = signal<Player | null>(null);

  constructor() {
    effect(() => {
      const currentSize = this.playersOnPitch().length;
      const targetSize = this.positions().length;

      if (currentSize !== targetSize) {
        const newArr = Array(targetSize).fill(null);
        const current = this.playersOnPitch();
        for (let i = 0; i < Math.min(currentSize, targetSize); i++) {
          newArr[i] = current[i];
        }
        this.playersOnPitch.set(newArr);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      this.sessionState.save('playersOnPitch', this.playersOnPitch());
    });
  }

  onSearch(query: string) {
    this.playerDataService.searchPlayers(query);
  }
  onClub(club: string) {
    this.playerDataService.filterByClub(club);
  }
  onPosition(position: string) {
    this.playerDataService.filterByPosition(position);
  }
  onReset() {
    this.playerDataService.resetFilters();
  }

  onPlayerClick(player: Player) {
    console.log('Player clicked:', player.short_name);
    this.selectedPlayer.set(player);
  }

  closePlayerDetails() {
    this.selectedPlayer.set(null);
  }

  clearField() {
    const size = this.positions().length;
    this.playersOnPitch.set(Array(size).fill(null));
  }

  removePlayer(index: number) {
    this.playersOnPitch.update(current => {
      const updated = [...current];
      updated[index] = null;
      return updated;
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const prevData = event.previousContainer.data;

      if (event.previousContainer.id === 'bench' && event.container.id.startsWith('pos-')) {
        const player = prevData[event.previousIndex];
        const targetIndex = parseInt(event.container.id.split('-')[1], 10);

        this.playersOnPitch.update(current => {
          const updated = [...current];
          updated[targetIndex] = player;
          return updated;
        });
      }
      else if (event.previousContainer.id.startsWith('pos-') && event.container.id.startsWith('pos-')) {
        const prevIndex = parseInt(event.previousContainer.id.split('-')[1], 10);
        const currIndex = parseInt(event.container.id.split('-')[1], 10);

        this.playersOnPitch.update(current => {
          const updated = [...current];
          const temp = updated[prevIndex];
          updated[prevIndex] = updated[currIndex];
          updated[currIndex] = temp;
          return updated;
        });
      }
      else if (event.previousContainer.id.startsWith('pos-') && event.container.id === 'bench') {
        const prevIndex = parseInt(event.previousContainer.id.split('-')[1], 10);
        this.playersOnPitch.update(current => {
          const updated = [...current];
          updated[prevIndex] = null;
          return updated;
        });
      }
    }
  }
}
