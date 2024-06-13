import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Info } from '../types'
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ NgIf, NgFor ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() info: Info = { titulo: "Chasis Modular", 
  descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
  fechaInicio: "20/05/2023", fechaFin: "5/08/2023", participantes: [], inSubtarea: false};
}
