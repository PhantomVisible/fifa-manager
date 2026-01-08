import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  search = '';
  club = '';
  position = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() clubChange = new EventEmitter<string>();
  @Output() positionChange = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  onSearchChange() {
    this.searchChange.emit(this.search);
  }
  onClubChange() {
    this.clubChange.emit(this.club);
  }
  onPositionChange() {
    this.positionChange.emit(this.position);
  }
  onReset() {
    this.search = '';
    this.club = '';
    this.position = '';
    this.reset.emit();
  }
}
