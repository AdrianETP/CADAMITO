import { Routes } from '@angular/router';
import { PatrociniosComponent } from './patrocinios/patrocinios.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { LineaTiempoComponent } from './linea-tiempo/linea-tiempo.component';
import { RolesComponent } from './roles/roles.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { TaskSubtareasComponent } from './task-subtareas/task-subtareas.component';
import { BoardComponent } from './board/board.component';
import { EditorPatrociniosComponent } from './editor-patrocinios/editor-patrocinios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'patrocinios', pathMatch: 'full' },
  { path: 'patrocinios', component: PatrociniosComponent },
  { path: 'taskManager/:id', component: TaskManagerComponent },
  { path: 'lineaTiempo', component: LineaTiempoComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'tableros', component: BoardComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'editor', component: EditorPatrociniosComponent },
  { path: 'task/:id', component: TaskSubtareasComponent },
  { path: '**', redirectTo: 'patrocinios' }
];
