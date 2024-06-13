  import { Component, EventEmitter, Output, Input } from '@angular/core';
  import { User } from '../types';
  import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

  
  @Component({
    selector: 'app-user-select',
    standalone: true,
    imports: [ FormsModule, NgClass, NgIf, NgFor],
    templateUrl: './user-select.component.html',
    styleUrl: './user-select.component.css'
  })
  export class UserSelectComponent {
  
    filteredUsers: User[] = [];
    @Input() usersTablero: User[] = [];
    @Output() UserEmmitter = new EventEmitter<User>();  
    inputName: string = '';
    errorMsg: boolean = false;
    users: User[] = [];

    filterUsers() {
      const query = this.inputName.toLowerCase();
      this.filteredUsers = this.usersTablero.filter(user =>
        user.Nombre.toLowerCase().includes(query)
      );
    }

    handleSubmit = (event: any) => {
      event.preventDefault();
      const selectedUser = this.usersTablero.find(user => user.Nombre.toLowerCase() === this.inputName.toLowerCase());
  
      if (selectedUser) {
        this.UserEmmitter.emit(selectedUser);
        this.users.push(selectedUser);
        console.log("usuario emit:", selectedUser)
        this.inputName = '';
        this.filteredUsers = [];
        this.errorMsg = false;
      } else {
        this.errorMsg = true;
      }
    }
  
    selectUser(user: User) {
      this.inputName = user.Nombre;
      this.filteredUsers = [];
      this.errorMsg = false;
    }

    resetUsers() {
      this.users = [];
    }
  }
  