import { Component } from '@angular/core';
import { PatrocinadorModalComponent } from '../patrocinador-modal/patrocinador-modal.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Sistema } from '../types';

@Component({
  selector: 'app-patrocinios',
  standalone: true,
  templateUrl: './patrocinios.component.html',
  styleUrl: './patrocinios.component.css',
  imports: [PatrocinadorModalComponent, NavbarComponent],
})
export class PatrociniosComponent {
  modalSistema: string = '';
  modalDescription: string = '';
  modalPartes: string[] = [];
  modalTareas: { tareaId: number, tareaNombre: string; tareaDesc: string; tareaFecha: string; tareaStatus: boolean; }[] = [];
  
  chasis: Sistema = {
    sistemaId: 1,
    sistemaNombre: '',
    sistemaDescripcion: '',
    avancePartes: [],
    avanceTareas: [],
  };

  suspension: Sistema = {
    sistemaId: 2,
    sistemaNombre: '',
    sistemaDescripcion: '',
    avancePartes: [],
    avanceTareas: [],
  };

  powerTrain: Sistema = {
    sistemaId: 3,
    sistemaNombre: '',
    sistemaDescripcion: '',
    avancePartes: [],
    avanceTareas: [],
  };

  electronica: Sistema = {
    sistemaId: 4,
    sistemaNombre: '',
    sistemaDescripcion: '',
    avancePartes: [],
    avanceTareas: [],
  };

  sistemas: Sistema[] = [this.chasis, this.suspension, this.powerTrain, this.electronica];

  async openModal(sistema: number) {
    const sist = this.sistemas[sistema-1];
    console.log(sist);
    if (sist){
      this.modalSistema = sist.sistemaNombre;
      this.modalDescription = sist.sistemaDescripcion;
      this.modalPartes = sist.avancePartes;
      this.modalTareas = sist.avanceTareas;
    }
  }
    
  
  async getSistema(sistemaId: number): Promise<Sistema | null>  {
    try {
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/sistema/${sistemaId}`);
      const sistemaData = await res.json();

        if (sistemaData) {
            const sistema: Sistema = {
                sistemaId: sistemaData.id,
                sistemaNombre: sistemaData.nombre,
                sistemaDescripcion: sistemaData.descripcion,
                avancePartes: [],
                avanceTareas: [],
            };

        sistema.avancePartes = await this.getPartes(sistema.sistemaId);
        sistema.avanceTareas = await this.getTareas(sistema.sistemaId);
        return sistema;
      } else {
        console.error(`No se encontró el sistema con id ${sistemaId}`);
        return null;
      }
    } catch (error) {
      console.error("Error al traer datos de sistemas:", error);
      return null;
    }
  }

  async getTareas(sistemaId: number): Promise<any[]> {
    try {
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/sponsors/${sistemaId}`);
      const data = await res.json();
      console.log("tareas ", data)

      const avanceTareas = (data.items ? data.items : []).map((item: any) => ({
        tareaId: item.id,
        tareaNombre: item.nombre,
        tareaDesc: item.descripcion ? item.descripcion : "",
        tareaFecha: item.fecha_terminacion ? item.fecha_terminacion.substring(0, 10).replaceAll("-","/") : "-",
        tareaStatus: item.estatus_conclusion === 'T' ? true : false
      }));
  
      return avanceTareas;      
    } catch (error) {
      console.error("Error al traer tareas de sistemas:", error);
      return [];
    }
  }

  async getPartes(sistemaId: number) : Promise<any[]>{
    try {
      const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/sponsoredparts/${sistemaId}`);
      const data = await res.json();
      console.log(data);
      
      const nombresPartes = (data.items ? data.items : []).map((item: any) => item.nombre);

      return nombresPartes;
      
    } catch (error) {
      console.error("Error al traer partes de sistemas:", error);
      return [];
    }
  }  

  constructor() {
    Promise.all([
      this.getSistema(1).then((sistema) => {
        if (sistema) {
          this.chasis = sistema;
        }
      }),
      this.getSistema(2).then((sistema) => {
        if (sistema) {
          this.suspension = sistema;
        }
      }),
      this.getSistema(3).then((sistema) => {
        if (sistema) {
          this.powerTrain = sistema;
        }
      }),
      this.getSistema(4).then((sistema) => {
        if (sistema) {
          this.electronica = sistema;
        }
      })
    ]).then(() => {
      this.sistemas = [this.chasis, this.suspension, this.powerTrain, this.electronica];
    });
  }
  

}
