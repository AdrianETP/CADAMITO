import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [RouterModule, SidebarTaskmanagerComponent],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {

}
