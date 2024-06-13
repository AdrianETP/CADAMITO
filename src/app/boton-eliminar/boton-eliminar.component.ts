import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIf } from '@angular/common';
import { LineaTiempo, Subtarea } from '../types';
import { AddtareasEditorComponent } from '../addtareas-editor/addtareas-editor.component';

@Component({
  selector: 'app-boton-eliminar',
  standalone: true,
  imports: [NgClass, NgIf, AddtareasEditorComponent],
  templateUrl: './boton-eliminar.component.html',
  styleUrl: './boton-eliminar.component.css'
})
export class BotonEliminarComponent {
  showModal: boolean = false;
  showToast: boolean = false;
  @Input() subtarea: Subtarea = { Id: -1, Nombre: "", Descripcion: "", FechaTerminacion: "", Estado: false, Sistema: 2 };
  @Output() eliminarFlecha = new EventEmitter<Subtarea>();
  @Output() eliminar = new EventEmitter<Boolean>();

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onDelete() {
    this.eliminarFlecha.emit(this.subtarea);
    console.log("Emision funcionando");
    this.eliminar.emit(true);
    this.showToast = true;
    this.closeModal();
  }


  hideToastAndModal() {
    this.showToast = false;
    this.showModal = false;
  }
}
