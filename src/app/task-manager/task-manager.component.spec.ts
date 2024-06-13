import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TaskManagerComponent } from './task-manager.component';
import { Tag, Tarea, User } from '../types';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TaskManagerComponent', () => {
  let component: TaskManagerComponent;
  let fixture: ComponentFixture<TaskManagerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, TaskManagerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1 // Provide a mock value for the id parameter
              }
            }

            // paramMap: of({ get: () => 'someValue' }), // Mock the paramMap observable
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // El usuario podra visualizar las secciones de su tablero
  // Adrian Eduardo Treviño Peña
  it('should load sections', async () => {
    await component.loadSections()
    expect(component.sections.length).toBeGreaterThan(0);
  });

  // El usuario no podra visualizar las secciones de un tablero que no existe
  // Adrian Eduardo Treviño Peña
  it("shoudnt load sections because tablero 0 doesnt exist", async () => {
    component.tableroId = 0
    await component.loadSections()
    expect(component.sections.length).toBe(0)
  })

  // El usuario podra visualizar las tareas de su tablero en sus secciones respectivas
  // Adrian Eduardo Treviño Peña
  it('should load tasks', async () => {
    let alltasks: Tarea[] = await component.loadTasks().then(e => {
      return e
    })
    expect(alltasks.length
    ).toBeGreaterThan(0);
  });

  // El usuario podra visualizar las tags de todas las tareas de su tablero en sus tareas correspondientes
  // Adrian Eduardo Treviño Peña
  it("should load Tags", async () => {
    let alltags = await component.loadTags({
      "id": 784,
      "nombre": "Tarea para test (NO BORRAAAAARRRR)",
      "seccion_id": 1,
      "fecha_creacion": "2024-06-06T00:00:00Z",
      "fecha_modificacion": "2024-06-05T00:00:00Z",
      "descripcion": null,
      "fecha_limite": "2024-06-20T00:00:00Z",
      "links": [
        {
          "rel": "self",
          "href": "https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/784"
        }
      ]
    })
    expect(alltags.length).toBeGreaterThan(0)
  })

  // El usuario podra visualizar los usuarios de todas las tareas de su tablero en sus tareas correspondientes
  // Adrian Eduardo Treviño Peña
  it("should load users", async () => {
    const allUser: User[] = await component.loadUsers({
      "id": 784,
      "nombre": "Tarea para test (NO BORRAAAAARRRR)",
      "seccion_id": 1,
      "fecha_creacion": "2024-06-06T00:00:00Z",
      "fecha_modificacion": "2024-06-05T00:00:00Z",
      "descripcion": null,
      "fecha_limite": "2024-06-20T00:00:00Z",
      "links": [
        {
          "rel": "self",
          "href": "https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/tarea/784"
        }
      ]
    })
    expect(allUser.length).toBeGreaterThan(0)
  })

  // Myriam Figueroa - H11T1 el usuario podrá agregar una sección al tablero de tareas para tener libertad de organización y trabajo
  it('should create a new section', () => {
    const nombreSeccion = "nuevaSeccion"
    component.onNewSection(nombreSeccion);
    const nuevaSeccion = component.sections.find(seccion => seccion.Nombre === nombreSeccion);
    expect(nuevaSeccion).toBeDefined();
  })

  // Myriam Figueroa - H11T2 el usuario no podrá crear una nueva sección con un nombre vacío
  it('should not create a new section with an empty name', () => {
    const nombreSeccion = "";
    const nombrevacio = () => component.onNewSection(nombreSeccion);
    expect(nombrevacio).toThrowError("El nombre de la sección no puede estar vacío.");
  });

  it("should add a task to task manager", async () => {
    component.tableroId = 1;
    await component.loadSections()
    component.modalId = 1;
    console.log("seccion ", component.sections.find(e => e.Id == component.modalId))
    component.onNewTask({
      Nombre: "nueva tarea",
      Id: Math.random() * 1000,
      Tags: [],
      Users: [],
      FechaLimite: "2222-22-22",
      Descripcion: "hola",
      FechaCreacion: "2222-22-33",
      FechaModificada: "2222-22-33"
    })
    console.log("nueva tarea", component.sections.find(e => e.Id === 1)?.Tareas.find(e => e.Nombre === "nueva tarea"))
    expect(component.sections.find(e => e.Id === 1)?.Tareas.find(e => e.Nombre === "nueva tarea")).toBeDefined()
  })
});

