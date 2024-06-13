import { Component, EventEmitter, Input, Output} from '@angular/core';
import {Tablero, User } from '../types';
import { AddTablerosComponent } from '../add-tableros/add-tableros.component';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';

@Component({
  selector: 'app-tableros',
  standalone: true,
  imports: [AddTablerosComponent, SidebarTaskmanagerComponent],
  templateUrl: './tableros.component.html',
  styleUrl: './tableros.component.css'
})
export class TablerosComponent {
  @Input() ModalId: number;
  @Output() NewBoard = new EventEmitter<Tablero>();
  AddBoard: () => void;
  constructor() {
    this.ModalId = 0;

    this.AddBoard = () => {
      let userInput = (
        document.getElementById('users') as HTMLInputElement
      ).value.split(',');
      let Users: User[] = [];

      for (let i = 0; i < userInput.length; i++) {
        Users.push({ Nombre: userInput[i] } as User);
      }
      const loggedTask: Tablero = {
        Id: Math.random(),
        Nombre: (document.getElementById('nombre') as HTMLInputElement).value,
        FechaInicio: (
          document.getElementById('fechaInicio') as HTMLInputElement
        ).value.replaceAll('-', '/'),
        FechaFin: (
          document.getElementById('fechaFin') as HTMLInputElement
        ).value.replaceAll('-', '/'),
        Users: Users,
      };
      let modal = document.getElementById(
        'my_modal_board',
      ) as HTMLDialogElement;
      modal.close();
      this.NewBoard.emit(loggedTask);
    };
  }
}
