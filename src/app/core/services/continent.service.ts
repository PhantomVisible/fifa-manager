import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {
  constructor(private dataService: DataService) {}

  getContinents() {
    return this.dataService.continents$;
  }
}
