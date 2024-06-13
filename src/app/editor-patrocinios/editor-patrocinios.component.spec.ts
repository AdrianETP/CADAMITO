import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EditorPatrociniosComponent } from './editor-patrocinios.component';

describe('EditorPatrociniosComponent', () => {
  let component: EditorPatrociniosComponent;
  let fixture: ComponentFixture<EditorPatrociniosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditorPatrociniosComponent],
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
    fixture = TestBed.createComponent(EditorPatrociniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Myriam Figueroa - H25T1
  it('obtener los avances de la línea del tiempo', async () => {
    await component.getHitosPatrocinios();
    expect(component.tareas.length).toBeGreaterThan(0);
  });

  //Myriam Figueroa - H25T2
  it('manejo de error de los avances de la línea del tiempo', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Error en llamada para línea del tiempo')));
    await component.getHitosPatrocinios();
    expect(component.tareas.length).toBe(0);
  });
});
