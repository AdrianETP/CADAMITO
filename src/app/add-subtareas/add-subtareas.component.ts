import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subtarea } from '../types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-subtareas',
  standalone: true,
  imports: [NgIf],
  templateUrl: './add-subtareas.component.html',
  styleUrl: './add-subtareas.component.css'
})
export class AddSubtareasComponent {
  @Input() ModalId: number;
  @Input() Sistema: number;
  @Output() newSubTask = new EventEmitter<Subtarea>();
  modalOpen = false;
  warning: string = "Titulo no puede estar vacio";
  showWarning: boolean = false;

  closeModal() {
    this.modalOpen = false;
    const modal = document.getElementById('my_modal_subtareas') as HTMLDialogElement;
    modal.close();
  }

  Addsubtask() {
    console.log("addaddtask")
    const tituloInput = document.getElementById('titulo') as HTMLInputElement;
    const descripcionInput = document.getElementById('descripción') as HTMLInputElement;

    const titulo = tituloInput.value;
    const descripcion = descripcionInput.value;

    if (titulo === "") {
      this.showWarning = true;
      return;
    }

    const ntl: Subtarea = {
      Id: Math.floor(Math.random() * 10000), // encontrar mejor forma de generar id creo
      Nombre: titulo,
      Descripcion: descripcion,
      Sistema: this.Sistema
    };

    this.showWarning = false;
    console.log("Hola");
    this.newSubTask.emit(ntl);
    this.clearInputs(tituloInput, descripcionInput);
    this.closeModal();
  }

  clearInputs(tituloInput: HTMLInputElement, descripcionInput: HTMLInputElement) {
    tituloInput.value = '';
    descripcionInput.value = '';
  }

  constructor() {
    this.ModalId = 0;
    this.Sistema = 0;  
  }
}
