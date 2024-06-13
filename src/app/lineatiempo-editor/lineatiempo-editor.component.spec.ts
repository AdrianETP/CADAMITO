import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoEditorComponent } from './lineatiempo-editor.component';

describe('LineatiempoEditorComponent', () => {
  let component: LineatiempoEditorComponent;
  let fixture: ComponentFixture<LineatiempoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineatiempoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineatiempoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
