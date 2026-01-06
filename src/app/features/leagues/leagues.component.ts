import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { League } from '../../core/models/league.model';
import { LeagueService } from '../../core/services/league.service';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leagues.component.html'
})
export class LeaguesComponent implements OnInit {
  leagues$!: Observable<League[]>;

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  ) {}

  ngOnInit(): void {
    this.leagues$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.leagueService.getLeaguesByContinent(params.get('continentId')!)
      )
    );
  }
}
