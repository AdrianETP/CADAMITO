import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-patrocinador-tarea',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './patrocinador-tarea.component.html',
  styleUrl: './patrocinador-tarea.component.css'
})
export class PatrocinadorTareaComponent {
  @Input() tareaTitle: string = '';
  @Input() tareaDesc: string = '';
  @Input() tareaFecha: string = '';
  @Input() tareaStatus: boolean = false;
}
