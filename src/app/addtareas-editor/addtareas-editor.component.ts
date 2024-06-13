import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { LineaTiempo } from '../types';

@Component({
  selector: 'app-addtareas-editor',
  standalone: true,
  imports: [NgClass],
  templateUrl: './addtareas-editor.component.html',
  styleUrls: ['./addtareas-editor.component.css']
})
export class AddtareasEditorComponent {
  @Input() ModalId: number;
  @Output() newTimeLine = new EventEmitter<LineaTiempo>();
  modalOpen = false;

  closeModal() {
    this.modalOpen = false;
    const modal = document.getElementById('my_modal_timeline') as HTMLDialogElement;
    modal.close();
  }

  Addtask() {
    console.log("addtask")
    const ntl: LineaTiempo = {
      Id: Math.floor(Math.random() * 10000),
      Nombre: (document.getElementById('nombre') as HTMLInputElement).value,
      Descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
      Fecha_publicacion: (document.getElementById('fecha_publicacion') as HTMLInputElement).value,
    };
    console.log(ntl)
    console.log("hola")
    this.newTimeLine.emit(ntl);
    this.closeModal();
  }

  constructor() {
    this.ModalId = 0;
  }
}
