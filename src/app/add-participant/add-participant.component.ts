import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../types';
import { Router, ActivatedRoute } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-participant',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, NgClass],
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnChanges {
  @Input() ModalId: number = 0;
  @Input() tareaId: number = -1;
  Users: User[] = [];
  @Output() newUser = new EventEmitter<User>();
  modalOpen = false;
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  inputName: string = '';
  errorMsg: boolean = false;

  closeModal() {
    this.modalOpen = false;
    this.selectedUser = null;
    this.inputName = '';
    this.errorMsg = false;
    const modal = document.getElementById('my_modal_participants') as HTMLDialogElement;
    modal.close();
  }

  //carga usuarios existentes en el departamento
  async loadUsers() {
    try {
      const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/taskusersdepartment/${this.tareaId}`);
      const data: { items: any[] } = await response.json();
      this.Users = data.items.map(item => ({
        Id: item.id,
        Nombre: item.nombre,
        Iniciales: item.nombre.charAt(0)
      }));
      console.log("usuarios departamento: ", this.Users);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  }

  //filtra por los usuarios existentes
  filterUsers() {
    const query = this.inputName.toLowerCase();
    this.filteredUsers = this.Users.filter(user =>
      user.Nombre.toLowerCase().includes(query)
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.inputName = user.Nombre; 
    this.filteredUsers = []; 
    this.errorMsg = false;
  }

  confirmSelection() {
    if (this.selectedUser) {
      this.newUser.emit(this.selectedUser);
      this.errorMsg = false;
      this.inputName = '';
      this.selectedUser = null;
      this.closeModal();
    } else{
      if (!this.Users.some(u => u.Id === this.selectedUser?.Id)) {
        this.errorMsg = true;
      }
    }
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tareaId']) {
      this.loadUsers();
    }
  }
}
