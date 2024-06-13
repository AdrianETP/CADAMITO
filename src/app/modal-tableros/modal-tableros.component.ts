import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Tablero, User } from '../types';

@Component({
  selector: 'app-modal-tableros',
  standalone: true,
  imports: [],
  templateUrl: './modal-tableros.component.html',
  styleUrl: './modal-tableros.component.css'
})
export class ModalTablerosComponent {
  @Input() ModalId: number;
  @Output() NewModalBoard = new EventEmitter<Tablero>();
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
        'my_modal_tasks',
      ) as HTMLDialogElement;
      modal.close();
      this.NewModalBoard.emit(loggedTask);
    };
  }
}
