import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PatrociniosComponent } from './patrocinios.component';

describe('PatrociniosComponent', () => {
  let component: PatrociniosComponent;
  let fixture: ComponentFixture<PatrociniosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PatrociniosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'someValue' }),
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrociniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Carolina Valdés - H3T3
  it('recibe sistema de llamada al API de Sistemas exitosa con información de Chasis', async () => {

    const sistema = await component.getSistema(1);
    fixture.detectChanges();

    expect(sistema!.sistemaId).toBe(1);
    expect(sistema!.sistemaNombre).toEqual('Chasis');
    expect(sistema!.sistemaDescripcion).toEqual('El chasis es el esqueleto de un vehículo, una estructura metálica o de otro material resistente que sostiene todos los componentes y sistemas del automóvil. Funciona como el armazón sobre el cual se ensamblan el motor, la transmisión, la suspensión, los frenos y otros elementos clave. Además de proporcionar soporte físico, el chasis también contribuye significativamente a la rigidez estructural del vehículo, lo que influye en su manejo, estabilidad y seguridad. En esencia, el chasis es el componente fundamental que da forma y define las características básicas de un automóvil.');
    
  });

  // Carolina Valdés - H3T7
  it('manejo de error en llamada al API de Sistemas', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada para Sistema')));
  
    const sistema = await component.getSistema(10);
    fixture.detectChanges();
  
    expect(sistema).toBeNull();
  });

  //Carolina Valdés - H3T5
  it('llamada al API de Partes exitosa para Chasis', async () => {
    const partes = await component.getPartes(1);
  
    expect(partes.length).toBe(4);
    expect(partes[0]).toEqual('Parachoques');
    expect(partes[1]).toEqual('Headlights');
    expect(partes[2]).toEqual('Parrilla');
    expect(partes[3]).toEqual('Bastidor');
  });
  
  //Carolina Valdés - H3T8
  it('manejo de error en llamada al API de Partes', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada para Partes')));
  
    const sistema = await component.getPartes(10);
    fixture.detectChanges();
  
    expect(sistema).toEqual([]);
  });
  
  //Carolina Valdés - H5T1
  it('llamada al API de Tareas de Chasis exitosa', async () => {
    const tareas = await component.getTareas(1);
    fixture.detectChanges();
  
    expect(tareas.length).toBe(5);
    expect(tareas[0].tareaId).toEqual(4586);
    expect(tareas[0].tareaNombre).toEqual("Selección y compra de materiales");  
  });
  
  //Carolina Valdés - H5T7
  it('manejo de error en llamada al API de Tareas', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada para Tareas')));
  
    const sistema = await component.getTareas(10);
    fixture.detectChanges();
  
    expect(sistema).toEqual([]);
  });  

  // Myriam Figueroa - H5T4 Las tareas terminadas muestran la fecha en las que fueron marcadas como finalizadas.
  it('tareas marcadas como finalizadas', async () => {
    const sistemaId = 1;
    const mockResponse = {
      items: [
        {
          id: 9708,
          nombre: "Diseño del chasis",
          descripcion: "Realizar el diseño conceptual del chasis, definiendo la geometría, las dimensiones y los puntos de fijación para los componentes del vehículo.",
          fecha_terminacion: "2024-05-31T18:02:12Z",
          estatus_conclusion: "T"
        },
        {
          id: 4586,
          nombre: "Selección y compra de materiales",
          descripcion: "Investigar y seleccionar los materiales adecuados para la construcción del chasis, considerando factores como resistencia, peso y coste.",
          fecha_terminacion: null,
          estatus_conclusion: "F"
        }
      ]
    };

    const expectedResult = [
      {
        tareaId: 9708,
        tareaNombre: "Diseño del chasis",
        tareaDesc: "Realizar el diseño conceptual del chasis, definiendo la geometría, las dimensiones y los puntos de fijación para los componentes del vehículo.",
        tareaFecha: "2024/05/31",
        tareaStatus: true
      },
      {
        tareaId: 4586,
        tareaNombre: "Selección y compra de materiales",
        tareaDesc: "Investigar y seleccionar los materiales adecuados para la construcción del chasis, considerando factores como resistencia, peso y coste.",
        tareaFecha: "-",
        tareaStatus: false
      }
    ];

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify(mockResponse))));
    const tareas = await component.getTareas(sistemaId);
    expect(tareas).toEqual(expectedResult);
  });

});
