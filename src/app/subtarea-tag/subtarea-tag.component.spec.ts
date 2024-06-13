import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtareaTagComponent } from './subtarea-tag.component';

describe('SubtareaTagComponent', () => {
  let component: SubtareaTagComponent;
  let fixture: ComponentFixture<SubtareaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtareaTagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtareaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
