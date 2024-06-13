import { Component, Input } from '@angular/core';
import { BotonPlusComponent } from '../boton-plus/boton-plus.component';

@Component({
  selector: 'app-lineatiempo-editor-gris',
  standalone: true,
  imports: [BotonPlusComponent],
  templateUrl: './lineatiempo-editor-gris.component.html',
  styleUrl: './lineatiempo-editor-gris.component.css'
})
export class LineatiempoEditorGrisComponent {
  avances: { avanceId: number, avanceNombre: string, avanceFecha: string, detalleTitle: string, detalleDesc: string, detalleImg?: string }[] = [];

  @Input() avanceTitle: string = 'Pruebas y Evaluación Inicial';
  @Input() avanceFecha: string = '07 / 05';
}
