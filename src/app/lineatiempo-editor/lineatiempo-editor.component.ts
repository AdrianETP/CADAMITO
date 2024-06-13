import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';
import { NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { LineaTiempo } from '../types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lineatiempo-editor',
  standalone: true,
  imports: [BotonEliminarComponent, NgClass, NgFor, DatePipe],
  templateUrl: './lineatiempo-editor.component.html',
  styleUrl: './lineatiempo-editor.component.css'
})
export class LineatiempoEditorComponent {
  @Input() tareas: LineaTiempo = {Id: -1, Nombre: "", Fecha_publicacion : "", Descripcion: ""};
  @Output() deleteTask = new EventEmitter<number>();
  @ViewChild(BotonEliminarComponent) eliminarBoton!: BotonEliminarComponent;

  openModal() {
    this.eliminarBoton.openModal();
  }

  async handleDeleteTask(eliminar: Boolean) {
    if (eliminar) {
      console.log("se borra ", eliminar);
      console.log("id tarea: ", this.tareas.Id);
      this.deleteTask.emit(this.tareas.Id); 
    }
  }
}

