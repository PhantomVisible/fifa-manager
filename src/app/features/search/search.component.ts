import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';

import { PlayerService } from '../../core/services/player.service';
import { ClubService } from '../../core/services/club.service';

import { Player } from '../../core/models/player.model';
import { Club } from '../../core/models/club.model';
import { PlayerCardComponent } from '../../shared/components/player-card/player-card.component';
import { TeamCardComponent } from '../../shared/components/team-card/team-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayerCardComponent,
    TeamCardComponent,
    RouterModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  filteredPlayers$!: Observable<Player[]>;
  filteredClubs$!: Observable<Club[]>;

  constructor(
    private playerService: PlayerService,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ?? '').toLowerCase().trim())
    );

    this.filteredPlayers$ = combineLatest([search$, this.playerService.players$]).pipe(
      map(([term, players]) =>
        players.filter(p => p.name.toLowerCase().includes(term))
      )
    );

    this.filteredClubs$ = combineLatest([search$, this.clubService.clubs$]).pipe(
      map(([term, clubs]) =>
        clubs.filter(c => c.name.toLowerCase().includes(term))
      )
    );
  }
}
