import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorLineaTiempoComponent } from './editor-linea-tiempo.component';

describe('EditorLineaTiempoComponent', () => {
  let component: EditorLineaTiempoComponent;
  let fixture: ComponentFixture<EditorLineaTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorLineaTiempoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorLineaTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
