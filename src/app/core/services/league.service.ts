import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  constructor(private dataService: DataService) {}

  getLeaguesByContinent(continentId: string) {
    return this.dataService.leagues$.pipe(
      map(leagues => leagues.filter(l => l.continentId === continentId))
    );
  }
}
