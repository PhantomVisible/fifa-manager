import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Player } from '../../../core/models/player.model';
import { PlayerService } from '../../../core/services/player.service';
import { PlayerCardComponent } from '../../../shared/components/player-card/player-card.component';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player$!: Observable<Player | undefined>;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.player$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.playerService.getPlayerById(params.get('playerId')!)
      )
    );
  }
}
