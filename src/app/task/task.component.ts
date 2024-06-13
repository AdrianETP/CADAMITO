import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';
import { Router } from '@angular/router';
import { ToastEliminarComponent } from '../toast-eliminar/toast-eliminar.component';
import { User } from '../types';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [BotonEliminarComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() Nombre: string;
  @Input() Id: number;
  @Input() Tags: { Nombre: string }[];
  @Input() Users: User[];
  @Input() FechaCreacion: string;
  @Input() FechaLimite: string;
  @Input() FechaModificada: string;
  @Output() DeleteEmitter = new EventEmitter<number>();
  @ViewChild(BotonEliminarComponent) eliminarBoton!: BotonEliminarComponent;
  @ViewChild(ToastEliminarComponent) eliminarToast!: ToastEliminarComponent;
  constructor(private router: Router) {
    this.Id = 0;
    this.Nombre = '';
    this.Tags = [];
    this.Users = [];
    this.FechaCreacion = '';
    this.FechaLimite = '';
    this.FechaModificada = ""
  }
  OpenModal() {
    this.eliminarBoton.openModal()
  }

  onTaskClick(sectionId: number) {
    this.router.navigate(['/task', sectionId]);
  }

  async onDelete(deleteParam: Boolean) {
    if (deleteParam) {
      const res = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/" + this.Id,
        {
          method: "DELETE"
        }


      )
      this.DeleteEmitter.emit(this.Id)
      ToastEliminarComponent.arguments.showToast = true




    }

  }
}
