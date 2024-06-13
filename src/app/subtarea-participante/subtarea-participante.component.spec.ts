import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtareaParticipanteComponent } from './subtarea-participante.component';

describe('SubtareaParticipanteComponent', () => {
  let component: SubtareaParticipanteComponent;
  let fixture: ComponentFixture<SubtareaParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtareaParticipanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtareaParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
