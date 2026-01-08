import { Component, signal, inject } from '@angular/core';
import { TacticalBoardComponent } from './features/tactical-board/tactical-board.component';
import { FormationSelectorComponent } from './features/formation-selector/formation-selector.component';
import { EditToggleComponent } from './features/edit-toggle/edit-toggle.component';
import { FormationService } from './core/services/formation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TacticalBoardComponent, FormationSelectorComponent, EditToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  formationService = inject(FormationService);

  editMode = signal(false);
  selectedFormation = signal(this.formationService.currentFormation().name);

  onFormationSelect(name: string) {
    this.selectedFormation.set(name);
    this.formationService.setFormation(name);
  }

  onEditToggle(edit: boolean) {
    this.editMode.set(edit);
  }
}
