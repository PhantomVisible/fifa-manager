import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-edit-toggle',
  standalone: true,
  templateUrl: './edit-toggle.component.html',
  styleUrl: './edit-toggle.component.css'
})
export class EditToggleComponent {
  @Input() editMode = false;
  @Output() toggle = new EventEmitter<boolean>();

  onToggle() {
    this.toggle.emit(!this.editMode);
  }
}
