import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CONTINENTS } from '../../data/continents.data';
import { LEAGUES } from '../../data/leagues.data';
import { CLUBS } from '../../data/clubs.data';
import { PLAYERS } from '../../data/players.data';

import { Continent } from '../models/continent.model';
import { League } from '../models/league.model';
import { Club } from '../models/club.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private continentsSubject = new BehaviorSubject<Continent[]>(CONTINENTS);
  private leaguesSubject = new BehaviorSubject<League[]>(LEAGUES);
  private clubsSubject = new BehaviorSubject<Club[]>(CLUBS);
  private playersSubject = new BehaviorSubject<Player[]>(PLAYERS);

  continents$ = this.continentsSubject.asObservable();
  leagues$ = this.leaguesSubject.asObservable();
  clubs$ = this.clubsSubject.asObservable();
  players$ = this.playersSubject.asObservable();
}
