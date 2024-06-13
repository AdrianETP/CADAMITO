import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subtarea } from '../types';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-subtarea',
  standalone: true,
  imports: [BotonEliminarComponent, NgIf],
  templateUrl: './subtarea.component.html',
  styleUrl: './subtarea.component.css'
})
export class SubtareaComponent {
  @Input() subtarea: Subtarea = { Id: -1, Nombre: "", Descripcion: "", FechaTerminacion: "", Estado: false, Sistema: 2 };

  @Output() deleteTask = new EventEmitter<number>();
  @Output() updateTask = new EventEmitter<Subtarea>();

  @ViewChild(BotonEliminarComponent) eliminarBoton!: BotonEliminarComponent;

  openModal() {
    this.eliminarBoton.openModal();
  }

  async handleDeleteTask(eliminar: Boolean) {
    if (eliminar) {
      console.log("se borra ", eliminar);
      console.log("id tarea: ", this.subtarea.Id);
      this.deleteTask.emit(this.subtarea.Id);
    }
  }

  async handleUpdateTask() {
    // si se marca como tarea completada
    console.log("actualiza subtarea con id: ", this.subtarea.Id);
    this.subtarea.Estado = !this.subtarea.Estado;
    this.updateTask.emit(this.subtarea);
  }
}
