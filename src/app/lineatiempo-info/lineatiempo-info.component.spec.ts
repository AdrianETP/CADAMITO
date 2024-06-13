import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoInfoComponent } from './lineatiempo-info.component';

describe('LineatiempoInfoComponent', () => {
  let component: LineatiempoInfoComponent;
  let fixture: ComponentFixture<LineatiempoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineatiempoInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineatiempoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
