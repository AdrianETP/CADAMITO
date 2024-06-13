import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFiltersComponent } from './task-filters.component';
import { Section } from '../types';

describe('TaskFiltersComponent', () => {
  let component: TaskFiltersComponent;
  let fixture: ComponentFixture<TaskFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Myriam Figueroa - H9 el usuario podrá filtar tareas en relación a una categoría específica
  it('should upload to database', async () => {
    (
      document.getElementById('nombreSeccion') as HTMLInputElement
    ).value = "NuevaSeccion";
    component.addSection()
    const res = await fetch(`https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/section/NuevaSeccion`)
    console.log(res)
    const resjson = await res.json()
    console.log("resjson", resjson) 
    const seccion = resjson.items[0]
    console.log(seccion)
    expect(seccion.nombre).toBe("NuevaSeccion")
  });
});
