import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../core/models/player.model';
import { formatValue, formatWage, getRatingColor } from '../../../core/utils/player-rating.util';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" (click)="onBackdropClick($event)">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <!-- Modal -->
      <div class="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-white/10 max-w-lg w-full max-h-[90vh] overflow-hidden" (click)="$event.stopPropagation()">
        
        <!-- Close Button -->
        <button 
          (click)="close.emit()" 
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Header with Player Photo Area -->
        <div class="relative h-32 bg-gradient-to-r from-emerald-600 to-green-700">
          <div class="absolute -bottom-12 left-6">
            <div class="w-24 h-24 rounded-xl bg-gradient-to-br {{ratingColorClass}} flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-slate-800">
              {{ player.overall }}
            </div>
          </div>
          <div class="absolute bottom-3 left-36 right-4">
            <h2 class="text-xl font-bold text-white truncate">{{ player.long_name }}</h2>
            <p class="text-sm text-white/80">{{ player.player_positions }}</p>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 pt-16 overflow-y-auto max-h-[calc(90vh-8rem)]">
          
          <!-- Basic Info Grid -->
          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="bg-white/5 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-400">Age</p>
              <p class="text-lg font-bold text-white">{{ player.age }}</p>
            </div>
            <div class="bg-white/5 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-400">Height</p>
              <p class="text-lg font-bold text-white">{{ player.height_cm }}cm</p>
            </div>
            <div class="bg-white/5 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-400">Weight</p>
              <p class="text-lg font-bold text-white">{{ player.weight_kg }}kg</p>
            </div>
          </div>
          
          <!-- Club & Nation -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-white/5 rounded-lg p-3">
              <p class="text-xs text-slate-400 mb-1">Club</p>
              <p class="text-sm font-semibold text-white">{{ player.club_name }}</p>
              <p class="text-xs text-slate-500">{{ player.league_name }}</p>
            </div>
            <div class="bg-white/5 rounded-lg p-3">
              <p class="text-xs text-slate-400 mb-1">Nationality</p>
              <p class="text-sm font-semibold text-white">{{ player.nationality }}</p>
            </div>
          </div>
          
          <!-- Value & Wage -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-white/5 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-400">Market Value</p>
              <p class="text-lg font-bold text-green-400">{{ formatValue(player.value_eur) }}</p>
            </div>
            <div class="bg-white/5 rounded-lg p-3 text-center">
              <p class="text-xs text-slate-400">Wage</p>
              <p class="text-lg font-bold text-yellow-400">{{ formatWage(player.wage_eur) }}</p>
            </div>
          </div>
          
          <!-- Stats -->
          <h3 class="text-xs font-semibold text-slate-400 uppercase mb-3">Attributes</h3>
          <div class="grid grid-cols-2 gap-2 mb-6">
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Pace</span>
              <span class="font-bold" [class]="getStatColor(player.pace)">{{ player.pace }}</span>
            </div>
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Shooting</span>
              <span class="font-bold" [class]="getStatColor(player.shooting)">{{ player.shooting }}</span>
            </div>
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Passing</span>
              <span class="font-bold" [class]="getStatColor(player.passing)">{{ player.passing }}</span>
            </div>
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Dribbling</span>
              <span class="font-bold" [class]="getStatColor(player.dribbling)">{{ player.dribbling }}</span>
            </div>
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Defending</span>
              <span class="font-bold" [class]="getStatColor(player.defending)">{{ player.defending }}</span>
            </div>
            <div class="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
              <span class="text-sm text-slate-300">Physic</span>
              <span class="font-bold" [class]="getStatColor(player.physic)">{{ player.physic }}</span>
            </div>
          </div>
          
          <!-- Extra Info -->
          <h3 class="text-xs font-semibold text-slate-400 uppercase mb-3">Details</h3>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-400">Preferred Foot</span>
              <span class="text-white">{{ player.preferred_foot }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Weak Foot</span>
              <span class="text-white">{{ player.weak_foot }}★</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Skill Moves</span>
              <span class="text-white">{{ player.skill_moves }}★</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Work Rate</span>
              <span class="text-white">{{ player.work_rate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Potential</span>
              <span class="text-green-400 font-bold">{{ player.potential }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Intl. Rep.</span>
              <span class="text-white">{{ player.international_reputation }}★</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class PlayerDetailsComponent {
  @Input() player!: Player;
  @Output() close = new EventEmitter<void>();

  get ratingColorClass(): string {
    return getRatingColor(this.player.overall);
  }

  formatValue = formatValue;
  formatWage = formatWage;

  getStatColor(stat: number): string {
    if (stat >= 85) return 'text-green-400';
    if (stat >= 70) return 'text-yellow-400';
    if (stat >= 50) return 'text-orange-400';
    return 'text-red-400';
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
}
