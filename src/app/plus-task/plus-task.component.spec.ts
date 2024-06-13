import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusTaskComponent } from './plus-task.component';

describe('PlusTaskComponent', () => {
  let component: PlusTaskComponent;
  let fixture: ComponentFixture<PlusTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlusTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
