import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonplusTasksubtareasComponent } from './botonplus-tasksubtareas.component';

describe('BotonplusTasksubtareasComponent', () => {
  let component: BotonplusTasksubtareasComponent;
  let fixture: ComponentFixture<BotonplusTasksubtareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonplusTasksubtareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonplusTasksubtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
