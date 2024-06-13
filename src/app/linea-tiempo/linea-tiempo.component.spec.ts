import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LineaTiempoComponent } from './linea-tiempo.component';
import { LineatiempoAvanceComponent } from '../lineatiempo-avance/lineatiempo-avance.component';
import { LineatiempoInfoComponent } from '../lineatiempo-info/lineatiempo-info.component';
import { LineatiempoDetalleComponent } from '../lineatiempo-detalle/lineatiempo-detalle.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';

describe('LineaTiempoComponent', () => {
  let component: LineaTiempoComponent;
  let fixture: ComponentFixture<LineaTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        LineaTiempoComponent,
        LineatiempoAvanceComponent,
        LineatiempoInfoComponent,
        LineatiempoDetalleComponent,
        NavbarComponent,
        NgFor,
        NgIf,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Carolina Valdés - H1T1
  it('recibir avances de linea de tiempo de manera exitosa', async () => {

    await component.getAvance();
    fixture.detectChanges();

    expect(component.avances.length).toBeGreaterThan(0)
    expect(component.avances[0].avanceNombre).toEqual('Investigación  y Análisis');
  });

  //Carolina Valdés - H1T3
  it('manejo correcto de error al llamar API', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada de API')));
    spyOn(console, 'error');

    await component.getAvance();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith("Error al traer datos de avances", jasmine.any(Error));

    expect(component.avances.length).toBe(0);
  });

  //Carolina Valdés - H1T2
  it('abrir drawer con informacion correcta', async () => {
    await component.getAvance();
    component.openDrawer(component.avances[0]);
    expect(component.selectedAvance).toEqual(component.avances[0]);
    expect(component.isDrawerOpen).toBe(true);
    expect(component.avances[0].avanceNombre).toEqual('Investigación  y Análisis');
  });

});
