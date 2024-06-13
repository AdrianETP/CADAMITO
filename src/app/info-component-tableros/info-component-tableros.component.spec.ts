import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponentTablerosComponent } from './info-component-tableros.component';

describe('InfoComponentTablerosComponent', () => {
  let component: InfoComponentTablerosComponent;
  let fixture: ComponentFixture<InfoComponentTablerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoComponentTablerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoComponentTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
