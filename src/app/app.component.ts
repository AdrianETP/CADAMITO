import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PatrocinadorModalComponent } from './patrocinador-modal/patrocinador-modal.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { LineaTiempoComponent } from './linea-tiempo/linea-tiempo.component';
import { SidebarTaskmanagerComponent } from './sidebar-taskmanager/sidebar-taskmanager.component';
import { BoardComponent } from './board/board.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { EditorPatrociniosComponent } from './editor-patrocinios/editor-patrocinios.component';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NavbarComponent, PatrocinadorModalComponent, TaskManagerComponent, LineaTiempoComponent, SidebarTaskmanagerComponent, BoardComponent, DepartamentosComponent, EditorPatrociniosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}

 