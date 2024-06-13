import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Tag, Tarea, User } from '../types';
import { TagSelectComponent } from '../tag-select/tag-select.component';
import { UserSelectComponent } from '../user-select/user-select.component';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [TagSelectComponent, UserSelectComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent {
  formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }
  Tags: Tag[] = []
  Users: User[] = []
  @Input() ModalId: number;
  @Input() usersTablero: User[] = [];
  @Output() Newtask = new EventEmitter<Tarea>();
  @ViewChild(UserSelectComponent) userSelectComponent!: UserSelectComponent;
  @ViewChild(TagSelectComponent) tagSelectComponent!: TagSelectComponent;

  onNewTag = (tag: Tag) => {
    this.Tags.push(tag)

  }

  onNewUser(user: User) {
    this.Users.push(user)
  }

  Addtask: () => void;
  AddTag: (id: string, tags: Tag[]) => void;
  AddUser: (id: string, users: User[]) => void;

  resetValues(){
    (document.getElementById("descripcion") as HTMLInputElement).value = "";
    (document.getElementById('nombre') as HTMLInputElement).value = "";
    (document.getElementById('fechaInicio') as HTMLInputElement).value = "";
    (document.getElementById('fechaFin') as HTMLInputElement).value = "";
    this.userSelectComponent.resetUsers();
    this.tagSelectComponent.resetTags();
  }

  constructor() {
    this.ModalId = 0;


    this.Addtask = async () => {

      const loggedTask: Tarea = {
        Id: Math.floor(Math.random() * 1000),
        Descripcion: (document.getElementById("descripcion") as HTMLInputElement).value,
        Nombre: (document.getElementById('nombre') as HTMLInputElement).value,
        FechaCreacion: (
          document.getElementById('fechaInicio') as HTMLInputElement
        ).value,
        FechaLimite: (
          document.getElementById('fechaFin') as HTMLInputElement
        ).value,
        FechaModificada: this.formatDate(new Date()),
        Tags: this.Tags,
        Users: this.Users,
      };
      let modal = document.getElementById(
        'my_modal_tasks',
      ) as HTMLDialogElement;
      modal.close();
      console.log("logged task", loggedTask)
      this.Newtask.emit(loggedTask);
      console.log(loggedTask.FechaCreacion)
      let res = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": ((loggedTask.Id)).toString(),
          "nombre": loggedTask.Nombre.toString(),
          "seccion_id": this.ModalId.toString(),
          "fecha_creacion": loggedTask.FechaCreacion + "T00:00:00Z",
          "fecha_modificacion": loggedTask.FechaModificada,
          "descripcion": loggedTask.Descripcion ? loggedTask.Descripcion : "",
          "fecha_limite": loggedTask.FechaLimite + "T00:00:00Z"
        })
      })
      let taskjson = res.json()
      console.log(taskjson)
      this.AddTag(((loggedTask.Id)).toString(), this.Tags)
      this.AddUser((loggedTask.Id).toString(), this.Users)
      this.resetValues();
    };
    this.AddTag = async (id: string, tags: Tag[]) => {
      const promises = tags.map(tag => {
        const body = {
          'tarea_id': id,
          'tag_nombre': tag.Nombre
        };
        console.log(body, tag.Id);
        return fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/taskmanager/task/addtag",
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
          }
        ).then(res => res.json());
      });

      const results = await Promise.all(promises);
    }
    this.AddUser = async (id: string, users: User[]) => {
      const promises = users.map(user => {
        const body = { 
          'tarea_id': id,
          'usuario_id': user.Id
        };
        console.log(body, user);
        return fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/usuario_tarea/",
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
          }
        ).then(res => res.json());
      });

      const results = await Promise.all(promises);
    }
  }
}
