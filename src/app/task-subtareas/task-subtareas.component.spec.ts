import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskSubtareasComponent } from './task-subtareas.component';
import { Subtarea, Tag, User } from '../types';

describe('TaskSubtareasComponent', () => {
  let component: TaskSubtareasComponent;
  let fixture: ComponentFixture<TaskSubtareasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TaskSubtareasComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 756 }
            }
            // paramMap: of({ get: (key: string) => 'someValue' }),
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSubtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //carolina valdes - H21-T3
  it('debe crear una subtarea con exito', async () => {
    let subtarea: Subtarea = {
      Id: 100,
      Nombre: "Subtarea 1",
      Descripcion: "Descripcion de la subtarea 1",
      Estado: false,
    }
    
    await component.handleNewSubTask(subtarea);
    fixture.detectChanges();

    expect(component.subtareas.length).toBeGreaterThan(0);
    expect(component.subtareas[0].Nombre).toEqual('Subtarea 1');
  })

  //Carolina Valdes - H22-T3
  it('debe eliminar una subtarea con exito', async () => {
    await component.handleDeleteTask(100);
    fixture.detectChanges();

    expect(component.subtareas.length).toBe(0);
  })


  //Carolina Valdes - H21-T6
  it('debe crear un tag con exito', async () => {
    let tags: Tag[] = [ {
      Nombre: "a"
    }]

    await component.handleNewTag(tags);
    fixture.detectChanges();

    expect(component.tags.length).toBeGreaterThan(0);
    expect(component.tags[0].Nombre).toEqual('a');
  })

  //Carolina Valdes - H22-T5
  it('debe eliminar un tag con exito', async () => {
    await component.handleDeleteTag('a');
    fixture.detectChanges();

    expect(component.tags.length).toBe(0);
  })

  //Carolina Valdes - H20-T1
  it('debe cargar información de tarea con éxito', async () => {
    await component.loadTareas(218);
    fixture.detectChanges();

    expect(component.info.titulo).toEqual('Posters de evento');
    expect(component.info.descripcion).toEqual('Material promocional para evento');
  })

  
});
