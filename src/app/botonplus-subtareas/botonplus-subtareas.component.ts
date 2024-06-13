import { Component } from '@angular/core';
import { AddSubtareasComponent } from '../add-subtareas/add-subtareas.component';

@Component({
  selector: 'app-botonplus-subtareas',
  standalone: true,
  imports: [AddSubtareasComponent],
  templateUrl: './botonplus-subtareas.component.html',
  styleUrl: './botonplus-subtareas.component.css'
})
export class BotonplusSubtareasComponent {
  openModal() {
    const modal = document.getElementById('my_modal_subtareas') as HTMLDialogElement;
    console.log(modal)
    modal.showModal();
  }
}
