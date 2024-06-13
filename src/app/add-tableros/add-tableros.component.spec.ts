import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTablerosComponent } from './add-tableros.component';

describe('AddTablerosComponent', () => {
  let component: AddTablerosComponent;
  let fixture: ComponentFixture<AddTablerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTablerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
