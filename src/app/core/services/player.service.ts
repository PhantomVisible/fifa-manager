import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataService } from './data.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players$!: Observable<Player[]>;

  constructor(private dataService: DataService) {
    this.players$ = this.dataService.players$; 
  }

  getPlayersByClub(clubId: string) {
    return this.players$.pipe(
      map(players => players.filter(p => p.clubId === clubId))
    );
  }

  getPlayerById(playerId: string) {
    return this.players$.pipe(
      map(players => players.find(p => p.id === playerId))
    );
  }
}
