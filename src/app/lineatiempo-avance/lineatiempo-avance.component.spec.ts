import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoAvanceComponent } from './lineatiempo-avance.component';

describe('LineatiempoAvanceComponent', () => {
  let component: LineatiempoAvanceComponent;
  let fixture: ComponentFixture<LineatiempoAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineatiempoAvanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineatiempoAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
