import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrocinadorTareaComponent } from '../patrocinador-tarea/patrocinador-tarea.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-patrocinador-modal',
  standalone: true,
  imports: [CommonModule, PatrocinadorTareaComponent, NgIf],
  templateUrl: './patrocinador-modal.component.html',
  styleUrl: './patrocinador-modal.component.css',
})
export class PatrocinadorModalComponent {
  @Input() Sistema: string = '';
  @Input() SistemaDesc: string = '';
  @Input() Partes: string[] = [];
  @Input() Tareas: {
    tareaId: number;
    tareaNombre: string;
    tareaDesc: string;
    tareaFecha: string;
    tareaStatus: boolean;
  }[] = [];

  public isFlipped = false;

  public tareasExisten(): boolean {
    return this.Tareas.length > 0;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
  
  public tareasCompletadas(): number {
    const total = this.Tareas.length;
    const completed = this.Tareas.filter(tarea => tarea.tareaStatus).length;
    return total === 0 ? 0 : (completed / total) * 100;
  }

}
