import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastEliminarComponent } from './toast-eliminar.component';

describe('ToastEliminarComponent', () => {
  let component: ToastEliminarComponent;
  let fixture: ComponentFixture<ToastEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
