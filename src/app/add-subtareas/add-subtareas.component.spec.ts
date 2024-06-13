import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtareasComponent } from './add-subtareas.component';

describe('AddSubtareasComponent', () => {
  let component: AddSubtareasComponent;
  let fixture: ComponentFixture<AddSubtareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubtareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSubtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
