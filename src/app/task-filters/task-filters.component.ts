import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.css',
})
export class TaskFiltersComponent {
  @Output() newSection = new EventEmitter<string>();
  @Input() tableroId: number = 0;
  addSection: () => void;

  constructor() {
    this.addSection = async () => {
      let nombre: string = (
        document.getElementById('nombreSeccion') as HTMLInputElement
      ).value;

      let modal = document.getElementById(
        'my_modal_section',
      ) as HTMLDialogElement;
      modal.close();
      this.newSection.emit(nombre);
      (document.getElementById('nombreSeccion') as HTMLInputElement).value = '';
      await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/seccion/",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          // TODO: cambiar a que el tablero no este harcodeado
          body: JSON.stringify({
            "id": (Math.random() * 10000).toString(),
            "nombre": nombre,
            "tablero_id": this.tableroId.toString(),
          }
          )
        }).then(async e => {
          console.log("response", await e.json())
        })

    };
  }
}
