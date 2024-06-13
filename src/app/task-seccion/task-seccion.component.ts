import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Tarea } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-seccion',
  standalone: true,
  imports: [TaskComponent],
  providers: [
    Router,
  ],
  templateUrl: './task-seccion.component.html',
  styleUrl: './task-seccion.component.css',
})
export class TaskSeccionComponent {
  @Input() Nombre: string;
  @Input() Tareas: Tarea[];
  @Input() Id: number;
  OpenModal: () => void;
  @Output() modalIdChange = new EventEmitter<number>();

  onTaskClick(sectionId: number) {
    this.router.navigate(['/taskManager', sectionId]);
  }
  handleDelete(id: number) {
    let index = this.Tareas.findIndex(obj => obj.Id === id);

    if (index !== -1) {
      this.Tareas.splice(index, 1);
    }
  }


  constructor(private router: Router) {
    this.Nombre = '';
    this.Id = 0;
    this.Tareas = [];
    this.OpenModal = () => {
      this.modalIdChange.emit(this.Id);
      const modal = document.getElementById(
        'my_modal_tasks',
      ) as HTMLDialogElement;

      modal.showModal();

      // this.router.navigate(['/taskManager#my_modal_tasks']);
    };


  }
}
