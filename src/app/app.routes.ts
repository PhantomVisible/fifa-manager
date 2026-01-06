import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ContinentsComponent } from './features/continents/continents.component';
import { LeaguesComponent } from './features/leagues/leagues.component';
import { ClubsComponent } from './features/clubs/clubs.component';
import { PlayersComponent } from './features/players/players.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'continents', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'continents', component: ContinentsComponent },
      { path: 'leagues/:continentId', component: LeaguesComponent },
      { path: 'clubs/:leagueId', component: ClubsComponent },
      { path: 'players/:clubId', component: PlayersComponent },
      { path: 'search', component: SearchComponent }
    ]
  }
];
