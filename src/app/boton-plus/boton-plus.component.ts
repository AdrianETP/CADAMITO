import { Component, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { AddtareasEditorComponent } from '../addtareas-editor/addtareas-editor.component';

@Component({
  selector: 'app-boton-plus',
  standalone: true,
  imports: [NgClass, AddtareasEditorComponent],
  templateUrl: './boton-plus.component.html',
  styleUrl: './boton-plus.component.css'
})
export class BotonPlusComponent {

  openModalInEditor() {
    const modal = document.getElementById('my_modal_timeline') as HTMLDialogElement;
    console.log(modal)
    modal.showModal();
  }
}
