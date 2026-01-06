import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from './data.service';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  clubs$!: Observable<Club[]>;

  constructor(private dataService: DataService) {
    this.clubs$ = this.dataService.clubs$; 
  }

  getClubsByLeague(leagueId: string) {
    return this.dataService.clubs$.pipe(
      map(clubs => clubs.filter(c => c.leagueId === leagueId))
    );
  }
}
