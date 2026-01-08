import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player.model';
import { Observable, shareReplay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlayerDataService {
  private http = inject(HttpClient);
  private playersUrl = 'assets/players_21.json';
  private allPlayers: Player[] = [];

  // Filter state
  private searchQuery = signal('');
  private clubFilter = signal('');
  private positionFilter = signal('');

  // Signal for filtered players
  filteredPlayers = signal<Player[]>([]);

  // Loading state
  isLoading = signal(true);

  constructor() {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    this.http.get<Player[]>(this.playersUrl).subscribe({
      next: (players) => {
        // Sort by overall rating (best first) and limit initial display
        this.allPlayers = players.sort((a, b) => b.overall - a.overall);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load players:', err);
        this.isLoading.set(false);
      }
    });
  }

  private applyFilters(): void {
    const query = this.searchQuery().toLowerCase().trim();
    const club = this.clubFilter().toLowerCase().trim();
    const position = this.positionFilter().toUpperCase().trim();

    let result = this.allPlayers;

    // Apply name search
    if (query) {
      result = result.filter(p =>
        p.short_name.toLowerCase().includes(query) ||
        p.long_name.toLowerCase().includes(query)
      );
    }

    // Apply club filter
    if (club) {
      result = result.filter(p =>
        p.club_name.toLowerCase().includes(club)
      );
    }

    // Apply position filter
    if (position) {
      result = result.filter(p =>
        p.player_positions.toUpperCase().includes(position)
      );
    }

    // If no filters, show top 20 players by default (minimal display)
    if (!query && !club && !position) {
      result = result.slice(0, 20);
    } else {
      // With filters, show up to 50 results
      result = result.slice(0, 50);
    }

    this.filteredPlayers.set(result);
  }

  searchPlayers(query: string): void {
    this.searchQuery.set(query);
    this.applyFilters();
  }

  filterByClub(club: string): void {
    this.clubFilter.set(club);
    this.applyFilters();
  }

  filterByPosition(position: string): void {
    this.positionFilter.set(position);
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.clubFilter.set('');
    this.positionFilter.set('');
    this.applyFilters();
  }

  getAllPlayers(): Observable<Player[]> {
    return of(this.allPlayers);
  }
}
