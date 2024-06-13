import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonplusSubtareasComponent } from './botonplus-subtareas.component';

describe('BotonplusSubtareasComponent', () => {
  let component: BotonplusSubtareasComponent;
  let fixture: ComponentFixture<BotonplusSubtareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonplusSubtareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonplusSubtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
