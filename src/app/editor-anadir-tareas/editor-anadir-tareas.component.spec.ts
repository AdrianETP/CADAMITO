import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Subtarea } from '../types';
import { EditorAnadirTareasComponent } from './editor-anadir-tareas.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditorAnadirTareasComponent', () => {
  let component: EditorAnadirTareasComponent;
  let fixture: ComponentFixture<EditorAnadirTareasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditorAnadirTareasComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'someValue' }),
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(EditorAnadirTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Myriam Figueroa - H24T1
  it('filtrar tareas en base al identificador del sistema', async () => {
    const mockResponse = {
      items: [
      {
        id: 4586,
        nombre: "Selección y compra de materiales",
        descripcion: "Investigar y seleccionar los materiales adecuados para la construcción del chasis, considerando factores como resistencia, peso y coste.",
        fecha_terminacion: null,
        estatus_conclusion: "F",
        sistema_id: 1
      },
      {
        id: 6105,
        nombre: "Modelado en CAD",
        descripcion: "Utilizar software de diseño asistido por computadora (CAD) para crear modelos 3D detallados del chasis.",
        fecha_terminacion: "2024-05-31T18:05:55Z",
        estatus_conclusion: "T",
        sistema_id: 1
      },
      {
        id: 9424,
        nombre: "Hacer documentación",
        descripcion: "Realizar una descripción detallada de la estructura esencial que sostiene todos los componentes y sistemas del automóvil.",
        fecha_terminacion: "2024-05-31T18:02:14Z",
        estatus_conclusion: "T",
        sistema_id: 1
      },
      {
        id: 9708,
        nombre: "Diseño del chasis",
        descripcion: "Realizar el diseño conceptual del chasis, definiendo la geometría, las dimensiones y los puntos de fijación para los componentes del vehículo.",
        fecha_terminacion: "2024-05-31T18:02:12Z",
        estatus_conclusion: "T",
        sistema_id: 1
      },
      {
        id: 4310,
        nombre: "Prototipado y Pruebas",
        descripcion: "Fabricar prototipos del chasis para realizar pruebas físicas y validar su rendimiento en términos de resistencia, durabilidad y seguridad.",
        fecha_terminacion: null,
        estatus_conclusion: "F",
        sistema_id: 1
      }
    ]
  };
  spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))));
  await component.getSubtareasPatrocinios();
  component.selectedSistemaId = 1;
  component.filterSubtareasBySystem();
  
  expect(component.subtareasFiltradas.length).toBe(5);
  expect(component.subtareasFiltradas[0].Nombre).toBe('Selección y compra de materiales');
  expect(component.subtareasFiltradas[1].Nombre).toBe('Modelado en CAD');
  expect(component.subtareasFiltradas[2].Nombre).toBe('Hacer documentación');
  expect(component.subtareasFiltradas[3].Nombre).toBe('Diseño del chasis');
  expect(component.subtareasFiltradas[4].Nombre).toBe('Prototipado y Pruebas');
  });

  //Myriam Figueroa - H24T2
  it('mostrar todas las tareas cuando no hay un sistema seleccionado', async () => {
    component.selectedSistemaId = 0;
    component.filterSubtareasBySystem();
    expect(component.subtareasFiltradas.length).toBe(component.subtareas.length);
  });

  //Myriam Figueroa - H24T3
  it('manejo de error en llamada a API subtareas filtradas', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada para SubtareasFiltradas')));

    const subtareasFiltradas = component.filterSubtareasBySystem();
    fixture.detectChanges();

    expect(subtareasFiltradas).toEqual([]);
  });

  //Myriam Figueroa - H24T13
  it('se agrega una nueva subtarea con exito', async () => {

    component.selectedSistemaId = 3;

    let subtarea: Subtarea = {
      Id: 9000, 
      Nombre: "NuevaSubtareaPowerTrain",
      Descripcion: "Descripcion de subtarea",
      FechaTerminacion: null,
      Estado: false, 
      Sistema: 3
    }
    
    await component.handleNewSubTask(subtarea);
    fixture.detectChanges();

    expect(component.subtareas.length).toBeGreaterThan(0);
    expect(component.subtareas.some(t => t.Id === 9000 && t.Nombre === 'NuevaSubtareaPowerTrain')).toBeTrue();
  });

  //Myriam Figueroa - H24T10
  it('se elimina con exito una subtarea', async () => {
    await component.handleDeleteTask(9000);
    fixture.detectChanges();
    
    expect(component.subtareas.length).toBe(0);
    expect(component.subtareas.some(t => t.Id === 9000)).toBeFalse();
  });
});
