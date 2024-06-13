import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSeccionComponent } from './task-seccion.component';

describe('TaskSeccionComponent', () => {
  let component: TaskSeccionComponent;
  let fixture: ComponentFixture<TaskSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
