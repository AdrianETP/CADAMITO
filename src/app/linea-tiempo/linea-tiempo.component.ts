import { Component } from '@angular/core';
import { LineatiempoAvanceComponent } from '../lineatiempo-avance/lineatiempo-avance.component';
import { LineatiempoInfoComponent } from '../lineatiempo-info/lineatiempo-info.component';
import { LineatiempoDetalleComponent } from '../lineatiempo-detalle/lineatiempo-detalle.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linea-tiempo',
  standalone: true,
  imports: [
    LineatiempoAvanceComponent,
    LineatiempoInfoComponent,
    LineatiempoDetalleComponent,
    NavbarComponent,
    NgFor,
    NgIf,
    FormsModule,
  ],
  templateUrl: './linea-tiempo.component.html',
  styleUrl: './linea-tiempo.component.css',
})
export class LineaTiempoComponent {
  avances: { avanceId: number, avanceNombre: string, avanceFecha: string, detalleTitle: string, detalleDesc: string, detalleImg?: string }[] = [];

  selectedAvance: any = null;
  isDrawerOpen: boolean = false;
  isLoading: boolean = true;

  openDrawer(avance: any): void {
    this.selectedAvance = avance;
    this.isDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }
  
  async getAvance() {
    try {
      const res = await fetch("https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/hito/");
      const data = await res.json();
      console.log(data);
  
      this.avances = (data.items ? data.items : []).map((item: { id: any; nombre: any; descripcion: any; fecha_publicacion: any, imagen_id: any; }) => ({
        avanceId: item.id,
        avanceNombre: item.nombre,
        avanceFecha: item.fecha_publicacion.substring(0, 10).replaceAll("-","/"),
        detalleTitle: item.nombre,
        detalleDesc: item.descripcion,
        detalleImg: item.imagen_id ? `../assets/images/${item.imagen_id}.png` : undefined
      }));

      this.sortAvancesByDate();
    } catch (error) {
      console.error("Error al traer datos de avances", error);
    } finally {
      this.isLoading = false;
    }
  }

  sortAvancesByDate() {
    this.avances.sort((a, b) => {
      const dateA = new Date(a.avanceFecha);
      const dateB = new Date(b.avanceFecha);
      return dateA.getTime() - dateB.getTime();
    });
  }
  
  
  constructor() {
    this.getAvance();
  }
}
