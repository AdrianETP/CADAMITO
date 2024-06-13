import { Component, OnInit } from '@angular/core';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';
import { TaskComponent } from '../task/task.component';
import { PlusTaskComponent } from '../plus-task/plus-task.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { InfoComponent } from '../info/info.component';
import { TaskFiltersComponent } from '../task-filters/task-filters.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskSeccionComponent } from '../task-seccion/task-seccion.component';
import { Tarea, Section, Tag, User, Info } from '../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    TaskComponent,
    PlusTaskComponent,
    BreadcrumbsComponent,
    InfoComponent,
    TaskFiltersComponent,
    TaskModalComponent,
    TaskSeccionComponent,
    SidebarTaskmanagerComponent,
  ],

  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
})
export class TaskManagerComponent implements OnInit {

  info: Info = { titulo: "", descripcion: "", fechaFin: "", fechaInicio: "", participantes: [], inSubtarea: true };

  modalId: number = 0;
  sections: Section[] = [];
  tableroId: number = 1;
  usersTablero: User[] = [];

  ngOnInit(): void {
    this.loadSections();
    this.loadTasks();
    this.loadTaskInfo(this.tableroId);
  }

  async loadSections(): Promise<void> {
    try {
      const sectionsResponse = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/seccion/");
      const sectionsData: {
        items: {
          id: number
          nombre: string
          tablero_id: number
        }[]
      } = await sectionsResponse.json();
      console.log("tablero id", this.tableroId)
      console.log(sectionsData.items)
      const sectionsFromAPI = sectionsData.items ? sectionsData.items.filter(item => item.tablero_id == this.tableroId) : [];
      console.log(sectionsFromAPI)

      this.sections = sectionsFromAPI.map((sectionData: any) => ({
        Id: sectionData.id,
        Nombre: sectionData.nombre,
        Tareas: [],
      }));

      console.log(this.sections)

    } catch (error) {
      console.error('Error loading sections:', error);
    }
  }
  async loadTags(taskData: any): Promise<Tag[]> {


    const tagsres = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/taskmanagertags/${taskData.id}`)
    const tagsFromApi: { items: any[] } = await tagsres.json()
    let tags: Tag[] = []

    for (let i = 0; i < tagsFromApi.items.length; i++) {
      tags.push({
        Nombre: tagsFromApi.items[i].nombre
      })
    }
    return tags
  }

  async loadUsers(taskData: any): Promise<User[]> {

    const usres = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/usertask/${taskData.id}`)
    const userFromApi: { items: any[] } = await usres.json()

    let users: User[] = []

    for (let i = 0; i < userFromApi.items.length; i++) {
      if (userFromApi.items[i].nombre != null) {
        users.push({
          Id: userFromApi.items[i].id,
          Nombre: userFromApi.items[i].nombre[0],
          Iniciales: userFromApi.items[i].nombre.charAt(0)
        })
      }
    }
    return users
  }

  async loadTasks(): Promise<Tarea[]> {
    const tasksResponse = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/");
    const tasksData = await tasksResponse.json();
    const tasksFromAPI = tasksData.items || [];
    console.log(tasksFromAPI)
    let allparentTasks: Tarea[] = [];

    const taskPromises = tasksFromAPI.map(async (taskData: any) => {
      const task: Tarea = {
        Id: taskData.id,
        Nombre: taskData.nombre,
        Tags: await this.loadTags(taskData),
        Users: await this.loadUsers(taskData),
        FechaCreacion: taskData.fecha_creacion ? taskData.fecha_creacion.substring(0, 10).replace(/-/g, "/") : "",
        FechaLimite: taskData.fecha_limite ? taskData.fecha_limite.substring(0, 10).replace(/-/g, "/") : "",
        FechaModificada: taskData.fecha_modificacion ? taskData.fecha_modificacion.substring(0, 10).replace(/-/g, "/") : "",
      };

      const parentSection = this.sections.find(section => section.Id === taskData.seccion_id);
      if (parentSection) {
        parentSection.Tareas.push(task);
        allparentTasks.push(task);
      } else {
        console.warn(`Task with ID ${taskData.id} has no parent section.`);
      }
      return task;
    });

    await Promise.all(taskPromises);

    return allparentTasks;
  }

  async loadTaskInfo(taskId: number) {
    try {
      const tasksResponse = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tablero/${taskId}`);
      const task = await tasksResponse.json();

      if (task) {
        this.info = {
          titulo: task.nombre,
          descripcion: task.descripcion,
          fechaInicio: "25/04/2024",
          fechaFin: "",
          participantes: await this.loadUsuariosTablero(taskId),
          inSubtarea: false,
        }
      }
    }
    catch (error) {
      console.error(`Error al traer tarea con id de tarea ${taskId}`, error);
    }
  }

  async loadUsuariosTablero(tableroID: number) {
    try {
      const UsuarioResponse = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/boardsusers/${tableroID}`);
      const task = await UsuarioResponse.json();

      let users: User[] = []

      for (let i = 0; i < task.items.length; i++) {
        users.push({
          Id: task.items[i].id,
          Nombre: task.items[i].nombre,
          Iniciales: task.items[i].nombre.charAt(0)
        })
      }
      console.log(users)
      this.usersTablero = users;
      return users
    }
    catch (error) {
      console.error(`Error al traer tarea con id de tarea ${this.tableroId}`, error);
      return
    }
  }


  onModalIdChange(newModalId: number): void {
    this.modalId = newModalId;
  }

  onNewTask(newTask: Tarea): void {
    const section = this.sections.find(e => e.Id === this.modalId)
    if (section != undefined) {
      section.Tareas.push(newTask)
    } else {
      console.error(`Invalid section index: ${this.modalId}`);
    }
  }

  onNewSection(newSectionName: string): void {
    if (newSectionName === "") {
      throw new Error("El nombre de la sección no puede estar vacío.");
    }

    const newSection: Section = {
      Id: this.sections.length + 1,
      Nombre: newSectionName,
      Tareas: [],
    };
    this.sections.push(newSection);
  }

  constructor(private route: ActivatedRoute) {
    this.tableroId = route.snapshot.params["id"]

  }

}

