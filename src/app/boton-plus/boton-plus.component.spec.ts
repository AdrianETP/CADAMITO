import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPlusComponent } from './boton-plus.component';

describe('BotonPlusComponent', () => {
  let component: BotonPlusComponent;
  let fixture: ComponentFixture<BotonPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonPlusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
