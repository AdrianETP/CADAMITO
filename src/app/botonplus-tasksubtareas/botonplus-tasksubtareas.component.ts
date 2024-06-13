import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { AddtareasEditorComponent } from '../addtareas-editor/addtareas-editor.component';
import { AddSubtareasComponent } from '../add-subtareas/add-subtareas.component';

@Component({
  selector: 'app-botonplus-tasksubtareas',
  standalone: true,
  imports: [NgClass, AddtareasEditorComponent, AddSubtareasComponent],
  templateUrl: './botonplus-tasksubtareas.component.html',
  styleUrl: './botonplus-tasksubtareas.component.css'
})
export class BotonplusTasksubtareasComponent {
  @Input() modalId: string = '';

  async openModal() {
    const modal = document.getElementById(this.modalId) as HTMLDialogElement;
    console.log("modal", modal);
    modal.showModal();
  }
}
