import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadorTareaComponent } from './patrocinador-tarea.component';

describe('PatrocinadorTareaComponent', () => {
  let component: PatrocinadorTareaComponent;
  let fixture: ComponentFixture<PatrocinadorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrocinadorTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrocinadorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
