import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private dataService: DataService) {}

  getClubsByLeague(leagueId: string) {
    return this.dataService.clubs$.pipe(
      map(clubs => clubs.filter(c => c.leagueId === leagueId))
    );
  }
}
