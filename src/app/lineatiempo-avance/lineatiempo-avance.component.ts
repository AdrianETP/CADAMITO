import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lineatiempo-avance',
  standalone: true,
  imports: [],
  templateUrl: './lineatiempo-avance.component.html',
  styleUrl: './lineatiempo-avance.component.css'
})
export class LineatiempoAvanceComponent {
  @Input() avanceTitle: string = '';
  @Input() avanceFecha: string = '';
}
