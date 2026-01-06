import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Club } from '../../core/models/club.model';
import { ClubService } from '../../core/services/club.service';
import { TeamCardComponent } from '../../shared/components/team-card/team-card.component';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, RouterModule, TeamCardComponent],
  templateUrl: './clubs.component.html'
})
export class ClubsComponent implements OnInit {
  clubs$!: Observable<Club[]>;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    this.clubs$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.clubService.getClubsByLeague(params.get('leagueId')!)
      )
    );
  }
}
