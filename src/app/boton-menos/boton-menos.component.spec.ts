import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonMenosComponent } from './boton-menos.component';

describe('BotonMenosComponent', () => {
  let component: BotonMenosComponent;
  let fixture: ComponentFixture<BotonMenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonMenosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonMenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
