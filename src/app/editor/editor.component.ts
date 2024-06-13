import { Component } from '@angular/core';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [SidebarTaskmanagerComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

}
