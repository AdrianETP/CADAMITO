import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadorModalComponent } from './patrocinador-modal.component';

describe('PatrocinadorModalComponent', () => {
  let component: PatrocinadorModalComponent;
  let fixture: ComponentFixture<PatrocinadorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrocinadorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrocinadorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Carolina Valdés - H4T4
  it('consigue número de tareas completadas para desplegar porcentaje', () => {
    component.Tareas = [
      {
        tareaId: 1,
        tareaNombre: 'Tarea 1',
        tareaDesc: 'Descripcion 1',
        tareaFecha: '2022-01-01',
        tareaStatus: true
      },
      {
        tareaId: 2,
        tareaNombre: 'Tarea 2',
        tareaDesc: 'Descripcion 2',
        tareaFecha: '2022-01-02',
        tareaStatus: false
      },
      {
        tareaId: 3,
        tareaNombre: 'Tarea 3',
        tareaDesc: 'Descripcion 3',
        tareaFecha: '2022-01-03',
        tareaStatus: true
      }
    ];
    expect(component.tareasCompletadas()).toBe(66.66666666666666);
  });
});
