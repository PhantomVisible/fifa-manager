import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Continent } from '../../core/models/continent.model';
import { ContinentService } from '../../core/services/continent.service';

@Component({
  selector: 'app-continents',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './continents.component.html'
})
export class ContinentsComponent implements OnInit {
  continents$!: Observable<Continent[]>;

  constructor(private continentService: ContinentService) {}

  ngOnInit(): void {
    this.continents$ = this.continentService.getContinents();
  }
}
