import { Component, ViewChild } from '@angular/core';
import { BotonPlusComponent } from '../boton-plus/boton-plus.component';
import { BotonMenosComponent } from '../boton-menos/boton-menos.component';
import { SubtareaComponent } from '../subtarea/subtarea.component';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { BotonplusSubtareasComponent } from '../botonplus-subtareas/botonplus-subtareas.component';
import { Subtarea } from '../types';
import { AddSubtareasComponent } from '../add-subtareas/add-subtareas.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEliminarComponent } from '../toast-eliminar/toast-eliminar.component';

@Component({
  selector: 'app-editor-anadir-tareas',
  standalone: true,
  imports: [BotonMenosComponent, BotonPlusComponent, SubtareaComponent, NgIf, BotonplusSubtareasComponent, NgFor, AddSubtareasComponent, CommonModule, ToastEliminarComponent],
  templateUrl: './editor-anadir-tareas.component.html',
  styleUrl: './editor-anadir-tareas.component.css'
})
export class EditorAnadirTareasComponent {
  @ViewChild(ToastEliminarComponent) toastEliminar!: ToastEliminarComponent;

  subtareas: Subtarea[] = [];
  subtareasFiltradas: Subtarea[] = [];
  total: number = 0;
  completed: number = 0;

  isOpen: boolean = false;
  selectedOption: string = '';
  selectedSistemaId: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initialize();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  filterSubtareasBySystem() {
    if (this.selectedSistemaId !== 0) {
      this.subtareasFiltradas = this.subtareas.filter(subtarea => subtarea.Sistema === this.selectedSistemaId);
    } else {
      this.subtareasFiltradas = this.subtareas;
    }
    this.tareasCompletadas();
    return this.subtareasFiltradas;
  }

  selectOption(option: string, selectedSistemaId: number, event: Event) {
    event.preventDefault();
    this.selectedOption = option;
    this.selectedSistemaId = selectedSistemaId;
    this.filterSubtareasBySystem();
    console.log(selectedSistemaId);
    this.isOpen = this.isOpen;
  }

  async handleNewSubTask(newSubTask: Subtarea) {
    newSubTask.Sistema = this.selectedSistemaId
    console.log("subtareas", this.subtareas);

    console.log("id", newSubTask.Id);

    try {
      const response = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/avance_tarea/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": (newSubTask.Id).toString(),
          "nombre": newSubTask.Nombre,
          "descripcion": newSubTask.Descripcion,
          "fecha_terminacion": newSubTask.FechaTerminacion,
          "estatus_conclusion": "F",
          "sistema_id": this.selectedSistemaId
        })
      });

      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        // solo hacer push si fue exitoso
        this.subtareas.push(newSubTask);
        this.filterSubtareasBySystem();
        console.log(this.subtareasFiltradas);      
        this.total = this.subtareas.length;
        await this.tareasCompletadas();
        console.log("Subtarea creada");
      } else {
        console.error("Error al crear subtarea: ${result.message}");
      }
    } catch (error) {
      console.error("Error al crear subtarea con id de tarea ${tareaId}", error);
    } 
  }

  async getSubtareasPatrocinios(){
    try{
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/avance_tarea/`);
      const data = await res.json();

      console.log('Response data:', data);
  
      this.subtareas = (data.items ? data.items : []).map((item: { id: any; nombre: any; descripcion: any; fecha_terminacion: any; estatus_conclusion: any; sistema_id: any;}) => ({
        Id: item.id,
        Nombre: item.nombre,
        Descripcion: item.descripcion,
        FechaTerminacion: item.fecha_terminacion,
        Estado: item.estatus_conclusion === 'T' ? true : false,
        Sistema: item.sistema_id,
      }));
      this.filterSubtareasBySystem();
      this.tareasCompletadas();
      console.log(this.subtareasFiltradas, "hola")
      } catch (error) {
      console.error(`Error al traer subtareas`, error);
      }
  }

  async handleUpdateTask(updatedSubTask: Subtarea) {
    updatedSubTask.Sistema = this.selectedSistemaId
    const index = this.subtareasFiltradas.findIndex(subtarea => subtarea.Id === updatedSubTask.Id);
    if (index !== -1) {
      try {
        const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/avance_tarea/${updatedSubTask.Id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "nombre": updatedSubTask.Nombre,
            "descripcion": updatedSubTask.Descripcion,
            "fecha_terminacion": updatedSubTask.Estado ? new Date().toISOString(): null,
            "estatus_conclusion": updatedSubTask.Estado ? "T" : "F",
            "sistema_id": this.selectedSistemaId,
          })
        });
  
        const result = await response.json();
        console.log("result", result);
        if (response.ok) {
          // solo update si fue exitoso
          this.subtareasFiltradas[index] = updatedSubTask;
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

  async handleDeleteTask(taskId: number) {
    console.log(taskId);
    try {
      const response = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/avance_tarea/${taskId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log("result", result);
      
      if (response.ok) {
        console.log(taskId);
        this.subtareas = this.subtareas.filter(task => task.Id !== taskId);
        this.filterSubtareasBySystem();
        this.total = this.subtareas.length;
        this.toastEliminar.showToastAndModal();
        console.log(`Tarea con ID ${taskId} eliminada correctamente.`);
      } else {
        console.error(`Error al eliminar tarea con ID ${taskId}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error al eliminar tarea con ID ${taskId}`, error);
    }
  }

  async tareasCompletadas() {
    // cuando tengamos las tareas se hace el count
    this.completed = 0;
    for (let tarea of this.subtareasFiltradas) {
      if (tarea.Estado) {
        this.completed++;
      }
    }
    this.total = this.subtareasFiltradas.length;
  }

  private async initialize() {
    await this.getSubtareasPatrocinios();
    this.tareasCompletadas();
  }
}
