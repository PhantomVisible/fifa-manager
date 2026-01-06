import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Player } from '../../core/models/player.model';
import { PlayerService } from '../../core/services/player.service';
import { PlayerCardComponent } from '../../shared/components/player-card/player-card.component';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, RouterModule],
  templateUrl: './players.component.html'
})
export class PlayersComponent implements OnInit {
  players$!: Observable<Player[]>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.players$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.playerService.getPlayersByClub(params.get('clubId')!)
      )
    );
  }
}
