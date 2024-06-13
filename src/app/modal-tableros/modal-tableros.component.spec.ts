import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTablerosComponent } from './modal-tableros.component';

describe('ModalTablerosComponent', () => {
  let component: ModalTablerosComponent;
  let fixture: ComponentFixture<ModalTablerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTablerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
