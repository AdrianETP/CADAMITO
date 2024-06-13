import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalComponent } from './task-modal.component';
import { EventEmitter } from '@angular/core';
import { Tarea } from '../types';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Adrian Eduardo Treviño Peña US8
  it('should create a task', async () => {
    // Set up the component properties and DOM elements
    component.Tags = [{ Nombre: 'tag1' }, { Nombre: 'tag2' }];
    component.ModalId = 1;

    // Mock the DOM elements
    const mockUserInput = document.createElement('input');
    mockUserInput.id = 'users';
    mockUserInput.value = 'user1,user2,user3';
    document.body.appendChild(mockUserInput);

    const mockDescripcionInput = document.createElement('input');
    mockDescripcionInput.id = 'descripcion';
    mockDescripcionInput.value = 'Test description';
    document.body.appendChild(mockDescripcionInput);

    const mockNombreInput = document.createElement('input');
    mockNombreInput.id = 'nombre';
    mockNombreInput.value = 'Test task';
    document.body.appendChild(mockNombreInput);

    const mockFechaInicioInput = document.createElement('input');
    mockFechaInicioInput.id = 'fechaInicio';
    mockFechaInicioInput.value = '2023-06-01';
    document.body.appendChild(mockFechaInicioInput);

    const mockFechaFinInput = document.createElement('input');
    mockFechaFinInput.id = 'fechaFin';
    mockFechaFinInput.value = '2023-06-10';
    document.body.appendChild(mockFechaFinInput);

    const mockModal = document.createElement('dialog');
    mockModal.id = 'my_modal_tasks';
    document.body.appendChild(mockModal);

    // Mock the formatDate function
    spyOn(component, 'formatDate').and.returnValue('2023-06-01T00:00:00Z');

    // Mock the emit function
    component.Newtask = new EventEmitter<Tarea>();
    const emitSpy = spyOn(component.Newtask, 'emit');


    // Call the Addtask method
    component.Addtask();


    // Check if the task was emitted
    expect(emitSpy).toHaveBeenCalled();

    // Check if the task object is correctly created
    const loggedTask = emitSpy.calls.mostRecent().args[0];

    expect(loggedTask).toBeDefined();

  });
});
