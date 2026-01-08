import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Formation } from '../../core/models/formation.model';

@Component({
  selector: 'app-formation-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <button 
        (click)="isOpen = !isOpen"
        class="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg transition-all">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
        </svg>
        {{ selected || 'Select Formation' }}
        <svg class="w-4 h-4 transition-transform" [class.rotate-180]="isOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      
      @if (isOpen) {
        <div class="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          @for (f of formations; track f.name) {
            <button 
              (click)="selectFormation(f.name)"
              class="w-full px-4 py-3 text-left text-sm hover:bg-slate-700 transition-colors flex items-center justify-between"
              [class.bg-emerald-600]="f.name === selected"
              [class.text-white]="f.name === selected"
              [class.text-slate-300]="f.name !== selected">
              <span class="font-medium">{{ f.name }}</span>
              @if (f.name === selected) {
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class FormationSelectorComponent {
  @Input() formations: Formation[] = [];
  @Input() selected: string = '';
  @Output() select = new EventEmitter<string>();

  isOpen = false;

  selectFormation(name: string) {
    this.select.emit(name);
    this.isOpen = false;
  }

  onDocumentClick(event: Event) {
    // Close dropdown when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('app-formation-selector')) {
      this.isOpen = false;
    }
  }
}
