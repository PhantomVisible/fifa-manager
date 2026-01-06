import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private dataService: DataService) {}

  getPlayersByClub(clubId: string) {
    return this.dataService.players$.pipe(
      map(players => players.filter(p => p.clubId === clubId))
    );
  }
  
  getPlayerById(playerId: string) {
    return this.dataService.players$.pipe(
      map(players => players.find(p => p.id === playerId))
    );
  }

}
