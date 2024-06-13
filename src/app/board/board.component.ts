import { Component, Input} from '@angular/core';
import { TablerosComponent } from '../tableros/tableros.component';
import { BreadcumbsTablerosComponent } from '../breadcumbs-tableros/breadcumbs-tableros.component';
import { InfoComponentTablerosComponent } from '../info-component-tableros/info-component-tableros.component';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BreadcumbsTablerosComponent, InfoComponentTablerosComponent, TablerosComponent, SidebarTaskmanagerComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  
}
