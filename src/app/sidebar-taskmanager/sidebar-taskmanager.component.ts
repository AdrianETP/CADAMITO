import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-taskmanager',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './sidebar-taskmanager.component.html',
  styleUrl: './sidebar-taskmanager.component.css'
})

export class SidebarTaskmanagerComponent {
  public isDrawerOpen = false;

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  
}
