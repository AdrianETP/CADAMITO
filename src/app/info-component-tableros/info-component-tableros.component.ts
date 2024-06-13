import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-component-tableros',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info-component-tableros.component.html',
  styleUrl: './info-component-tableros.component.css'
})
export class InfoComponentTablerosComponent {
  departmentDescription = "Descripción del Departamento - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
