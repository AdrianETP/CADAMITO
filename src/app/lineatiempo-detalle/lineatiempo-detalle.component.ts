import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lineatiempo-detalle',
  standalone: true,
  imports: [],
  templateUrl: './lineatiempo-detalle.component.html',
  styleUrl: './lineatiempo-detalle.component.css'
})
export class LineatiempoDetalleComponent {
  @Input() detalleTitle: string = '';
  @Input() detalleDesc: string = '';
  @Input() detalleImg?: string = 'PartesCarro.png';
}
