import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoEditorGrisComponent } from './lineatiempo-editor-gris.component';

describe('LineatiempoEditorGrisComponent', () => {
  let component: LineatiempoEditorGrisComponent;
  let fixture: ComponentFixture<LineatiempoEditorGrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineatiempoEditorGrisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineatiempoEditorGrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
