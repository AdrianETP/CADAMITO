import { Component, Input, ViewChild} from '@angular/core';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';
import { BreadcumbsEditorComponent } from '../breadcumbs-editor/breadcumbs-editor.component';
import { SubtareaComponent } from '../subtarea/subtarea.component';
import { BotonMenosComponent } from '../boton-menos/boton-menos.component';
import { BotonPlusComponent } from '../boton-plus/boton-plus.component';
import { LineatiempoEditorComponent } from '../lineatiempo-editor/lineatiempo-editor.component';
import { LineatiempoEditorGrisComponent } from '../lineatiempo-editor-gris/lineatiempo-editor-gris.component';
import { EditorAnadirTareasComponent } from '../editor-anadir-tareas/editor-anadir-tareas.component';
import { LineaTiempo, Subtarea } from '../types';
import { AddtareasEditorComponent } from '../addtareas-editor/addtareas-editor.component';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEliminarComponent } from '../toast-eliminar/toast-eliminar.component';

@Component({
  selector: 'app-editor-patrocinios',
  standalone: true,
  imports: [SidebarTaskmanagerComponent, BreadcumbsEditorComponent, SubtareaComponent, BotonMenosComponent, BotonPlusComponent, LineatiempoEditorComponent, LineatiempoEditorGrisComponent, EditorAnadirTareasComponent, AddtareasEditorComponent, NgFor, NgIf, BotonEliminarComponent, ToastEliminarComponent],
  templateUrl: './editor-patrocinios.component.html',
  styleUrl: './editor-patrocinios.component.css'
})
export class EditorPatrociniosComponent {
  @Input() Tablero: string = 'Patrocinios';
  @ViewChild(ToastEliminarComponent) toastEliminar!: ToastEliminarComponent;

  tareas: LineaTiempo[] = [];
  total: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initialize();
  }

  async handleNewTask(newTask: LineaTiempo) {

    const fechaActual = new Date();
    const horas = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaActual.getSeconds().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}:${segundos}`;

    const fechaPublicacionConHora = `${newTask.Fecha_publicacion}T${horaActual}Z`;
    console.log(fechaPublicacionConHora);

    try {
      const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/hito/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": (newTask.Id).toString(),
          "nombre": newTask.Nombre,
          "descripcion": newTask.Descripcion,
          "imagen_id": null,
          "fecha_publicacion":fechaPublicacionConHora,
        })
      });

      const result = await response.json();
      console.log("result", result);

      if (response.ok) {
        // solo hacer push si fue exitoso
        this.tareas.push(newTask);
        console.log(this.tareas);      
        this.total = this.tareas.length;
        this.sortAvancesByDate();
        console.log("Hito creada");
      } else {
        console.error("Error al crear hito: ${result.message}");
      }
    } catch (error) {
      console.error("Error al crear hito con id de tarea ${tareaId}", error);
    } 
  }

  async getHitosPatrocinios(){
    try{
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/hito/`);
      const data = await res.json();

      console.log('Response data:', data);
  
      this.tareas = (data.items ? data.items : []).map((item: { id: any; nombre: any; descripcion: any; fecha_publicacion: any; imagen_id: any;}) => ({
        Id: item.id,
        Nombre: item.nombre,
        Descripcion: item.descripcion,
        Fecha_publicacion: item.fecha_publicacion,
        Imagen: item.imagen_id,
      }));
      this.sortAvancesByDate();
      console.log(this.tareas, "hola")
      } catch (error) {
      console.error(`Error al traer subtareas`, error);
      }
  }

  async handleDeleteTask(taskId: number) {
    console.log('Task to delete:', taskId);

    try {
      const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/hito/${taskId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log("result", result);
      
      if (response.ok) {
        console.log(taskId);
        this.tareas = this.tareas.filter(task => task.Id !== taskId);
        this.total = this.tareas.length;
        this.toastEliminar.showToastAndModal();
        console.log(`Tarea con ID ${taskId} eliminada correctamente.`);
      } else {
        console.error(`Error al eliminar tarea con ID ${taskId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error al eliminar tarea con ID ${taskId}`, error);
    }
  }

  sortAvancesByDate() {
    this.tareas.sort((a, b) => {
      const dateA = new Date(a.Fecha_publicacion);
      const dateB = new Date(b.Fecha_publicacion);
      return dateA.getTime() - dateB.getTime();
    });
  }

  private async initialize() {
    await this.getHitosPatrocinios();
  }
}
