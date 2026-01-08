import { Component } from '@angular/core';
import { PitchComponent } from '../pitch/pitch.component';

@Component({
  selector: 'app-stadium',
  standalone: true,
  imports: [PitchComponent],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.css'
})
export class StadiumComponent {}
