import { Component, ViewChild } from '@angular/core';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { InfoComponent } from '../info/info.component';
import { SubtareaComponent } from '../subtarea/subtarea.component';
import { SubtareaParticipanteComponent } from '../subtarea-participante/subtarea-participante.component';
import { BotonplusTasksubtareasComponent } from '../botonplus-tasksubtareas/botonplus-tasksubtareas.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subtarea, Tag, User, Info } from '../types';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { AddSubtareasComponent } from '../add-subtareas/add-subtareas.component';
import { AddTagsComponent } from '../add-tags/add-tags.component';
import { AddParticipantComponent } from '../add-participant/add-participant.component';
import { FormsModule } from '@angular/forms';
import { ToastEliminarComponent } from '../toast-eliminar/toast-eliminar.component';
import { SubtareaTagComponent } from '../subtarea-tag/subtarea-tag.component';


@Component({
  selector: 'app-task-subtareas',
  standalone: true,
  imports: [SidebarTaskmanagerComponent, BreadcrumbsComponent, InfoComponent, SubtareaComponent,
    SubtareaParticipanteComponent, BotonplusTasksubtareasComponent, NgFor, NgIf, AddSubtareasComponent, 
    AddTagsComponent, AddParticipantComponent, FormsModule,
    ToastEliminarComponent, CommonModule, SubtareaTagComponent],
  templateUrl: './task-subtareas.component.html',
  styleUrl: './task-subtareas.component.css'
})
export class TaskSubtareasComponent {

  @ViewChild(ToastEliminarComponent) toastEliminar!: ToastEliminarComponent;


  info: Info = { titulo: "Chasis Modular", descripcion: "Lorem ipsum", fechaFin: "20/05/2023", fechaInicio: "20/05/2023", participantes: [], inSubtarea: true };

  subtareas: Subtarea[] = [];

  tags: Tag[] = [];

  users: User[] = [];

  filteredUsers: User[] = [...this.users];

  completed: number = 0;
  total: number = 0;
  searchQuery: string = '';
  tareaId = this.route.snapshot.params['id'];


  async getSubtareas(id: number){
    try{
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/tasks/${id}/subtasks`);
      const data = await res.json();
  
      this.subtareas = (data.items ? data.items : []).map((item: { id: any; nombre: any; descripcion: any; tarea_id: any; estatus_terminacion: any}) => ({
        Id: item.id,
        Nombre: item.nombre,
        Descripcion: item.descripcion,
        Estado: item.estatus_terminacion === 'T' ? true : false,
      }));
      }
      catch (error) {
      console.error(`Error al traer subtareas con id de tarea ${id}`, error);
      }
  }

  async loadTags(taskId: number) {
    try{
      const tagsres = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/taskmanagertags/${taskId}`)
      const tagsFromApi: { items: any[] } = await tagsres.json()
      let tags: Tag[] = []
  
      for (let i = 0; i < tagsFromApi.items.length; i++) {
        tags.push({
          Nombre: tagsFromApi.items[i].nombre,
          Id: i,
        })
      }
      this.tags = tags;
      console.log(tags);
    }
    catch (error) {
      console.error(`Error al traer tags con id de tarea ${taskId}`, error);
    }
  }

  async loadUsers(taskId: number) {
    try{
      const usres = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/usertask/${taskId}`)
      const userFromApi: { items: any[] } = await usres.json()
  
      let users: User[] = []
  
      for (let i = 0; i < userFromApi.items.length; i++) {
        users.push({
          Nombre: userFromApi.items[i].nombre,
          Iniciales: userFromApi.items[i].nombre.charAt(0),
          Id: userFromApi.items[i].id,
        })
      }
      this.users = users;
      this.filteredUsers = users;
      console.log(users);
    }
    catch (error) {
      console.error(`Error al traer usuarios con id de tarea ${taskId}`, error);
    }
    
  }

  async loadTareas(taskId: number) {
    try{
      const tasksResponse = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/${taskId}`);
      const task = await tasksResponse.json();
  
      if (task) {
          this.info = {
            titulo: task.nombre,
            descripcion: task.descripcion,
            fechaInicio: task.fecha_creacion.substring(0, 10).replaceAll("-","/"),
            fechaFin: task.fecha_limite.substring(0, 10).replaceAll("-","/"),
            participantes: [],
            inSubtarea: true,
          }
        }
      }
      catch (error) {
        console.error(`Error al traer tarea con id de tarea ${taskId}`, error);
      }
  }

  async handleNewSubTask(newSubTask: Subtarea) {
    console.log("subtareas", this.subtareas);

    console.log("id", newSubTask.Id);

    try {
      const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/subtarea/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": (newSubTask.Id).toString(),
          "nombre": newSubTask.Nombre,
          "descripcion": newSubTask.Descripcion,
          "tarea_id": this.tareaId,
          "estatus_terminacion": "F",
        })
      });

      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        // solo hacer push si fue exitoso
        this.subtareas.push(newSubTask);
        this.total = this.subtareas.length;
        console.log("Subtarea creada");
      } else {
        console.error(`Error al crear subtarea: ${result.message}`);
        this.toastEliminar.showToastAndModalError();
      }
    } catch (error) {
      console.error(`Error al crear subtarea con id de tarea ${this.tareaId}`, error);
      this.toastEliminar.showToastAndModalError();
    } 
  }

  async handleUpdateTask(updatedSubTask: Subtarea) {
    const index = this.subtareas.findIndex(subtarea => subtarea.Id === updatedSubTask.Id);
    if (index !== -1) {
      try {
        const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/subtarea/${updatedSubTask.Id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "nombre": updatedSubTask.Nombre,
            "descripcion": updatedSubTask.Descripcion,
            "tarea_id": this.tareaId,
            "estatus_terminacion": updatedSubTask.Estado ? "T" : "F",
          })
        });
  
        const result = await response.json();
        console.log("result", result);
        if (response.ok) {
          // solo update si fue exitoso
          this.subtareas[index] = updatedSubTask;
          console.log(`Subtarea con id ${updatedSubTask.Id} actualizada`);
          this.tareasCompletadas();
        } else {
          console.error(`Error al update subtarea: ${result.message}`);
        }
      } catch (error) {
        console.error(`Error al update subtarea`, error);
      } 
    }
  }

  async handleNewTag(newTags: Tag[]) {
    console.log("tag:", newTags);
    for (let tag of newTags) {
      const body = {
        "tag_nombre": tag.Nombre,
        "tarea_id": this.tareaId,
      };
  
      try {
        const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/taskmanager/task/addtag", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
  
        let result = null;
        const text = await response.text();
        if (text) {
          result = JSON.parse(text); 
        }
  
        console.log("result", text);
        if (response.ok) {
          // solo hacer push si fue exitoso
          this.tags.push(tag);
          console.log(`Subtarea con id ${tag.Id} creada`);
        } else {
          console.error(`Error al agregar tag: ${result ? result.message : 'No result message'}`);
        }
      } catch (error) {
        console.error(`Error al agregar tag`, error);
      }
    }
  }
  

  async handleNewUser(newUser: User) {
    console.log("user:", newUser);
    try {
      const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/usuario_tarea/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "usuario_id": (newUser.Id!).toString(),
          "tarea_id": this.tareaId.toString(),
        })
      });

      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        // solo hacer push si fue exitoso
        this.users.push(newUser);
        console.log("usuario agregado");
      } else {
        console.error(`Error al agregar usuario: ${result.message}`);
        this.toastEliminar.showToastAndModalError();
      }
    } catch (error) {
      console.error(`Error al agregar usuario`, error);
      this.toastEliminar.showToastAndModalError();
    } 
    
    
  }

  async handleDeleteTask(taskId: number) {
    console.log('Task to delete:', taskId);

    try {
      const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/subtarea/${taskId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        // solo hacer delete si fue exitoso
        this.subtareas = this.subtareas.filter(task => task.Id !== taskId);
        this.tareasCompletadas();
        this.toastEliminar.showToastAndModal();
        console.log("Subtarea borrada");
      } else {
        console.error(`Error al borrar subtarea: ${result.message}`);
        this.toastEliminar.showToastAndModalError();
      }
    } catch (error) {
      console.error(`Error al borrar subtarea con id ${taskId}`, error);
      this.toastEliminar.showToastAndModalError();
    }

  }

  async handleDeleteUser(userId: number) {
    console.log('user to delete:', userId);
    
    try {
      const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/usuario_tarea/${userId},${this.tareaId}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        // solo hacer delete si fue exitoso
        this.users = this.users.filter(user => user.Id !== userId);
        this.filterUsers();
        this.toastEliminar.showToastAndModal();
        console.log("usuario borrado");
      } else {
        console.error(`Error al borrar usuario: ${result.message}`);
        this.toastEliminar.showToastAndModalError();
      }
    } catch (error) {
      console.error(`Error al borrar usuario`, error);
      this.toastEliminar.showToastAndModalError();
    }
  }

  async handleDeleteTag(tagNom: string) {
    console.log('tag to delete:', tagNom);
    
    try {
      const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/taskmanager/task/deletetag", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "tarea_id": this.tareaId.toString(),
          "tag_nombre": tagNom
        })
      });

      if (response.ok) {
        // solo hacer delete si fue exitoso
        console.log("entre al response ok")
        this.tags = this.tags.filter(tag => tag.Nombre !== tagNom);
        this.toastEliminar.showToastAndModal();
      } else {
        console.error(`Error al eliminar tag: ${response.statusText}`);
        this.toastEliminar.showToastAndModalError();
      }
    } catch (error) {
      console.error(`Error al eliminar tag`, error);
      this.toastEliminar.showToastAndModalError();
    }
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => user.Nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initialize();
  }

  private async initialize() {
    await this.getSubtareas(this.tareaId);
    await this.loadTags(this.tareaId);
    this.loadUsers(this.tareaId); 
    this.tareasCompletadas();
    this.loadTareas(this.tareaId);
  }

  async tareasCompletadas() {
    // cuando tengamos las tareas se hace el count
    this.completed = 0;
    for (let tarea of this.subtareas) {
      if (tarea.Estado) {
        this.completed++;
      }
    }
    this.total = this.subtareas.length;
  }
}
