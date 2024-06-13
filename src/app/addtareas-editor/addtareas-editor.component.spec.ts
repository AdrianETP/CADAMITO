import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtareasEditorComponent } from './addtareas-editor.component';

describe('AddtareasEditorComponent', () => {
  let component: AddtareasEditorComponent;
  let fixture: ComponentFixture<AddtareasEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtareasEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddtareasEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
