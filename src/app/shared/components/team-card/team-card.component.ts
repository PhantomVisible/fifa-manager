import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Club } from '../../../core/models/club.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() club!: Club;
}
