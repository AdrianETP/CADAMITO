import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../types';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';

@Component({
  selector: 'app-subtarea-participante',
  standalone: true,
  imports: [BotonEliminarComponent],
  templateUrl: './subtarea-participante.component.html',
  styleUrl: './subtarea-participante.component.css'
})
export class SubtareaParticipanteComponent {

  @Input() participante: User = {Nombre: "", Iniciales: "", Id: -1 };

  id: number = -1;

  @Output() deleteUser = new EventEmitter<number>();

  @ViewChild(BotonEliminarComponent) eliminarBoton!: BotonEliminarComponent;

  openModal() {
    this.eliminarBoton.openModal();
  }

  async handleDeleteUser(eliminar: Boolean) {
    if (eliminar) {
      console.log("se borra ", eliminar);
      console.log("id participante: ", this.participante.Id, this.participante.Nombre);
      this.deleteUser.emit(this.participante.Id);
    }
  }

  constructor() {
    this.id = this.participante.Id ? this.participante.Id : -1;
  }
  
}
