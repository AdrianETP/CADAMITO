import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumbsTablerosComponent } from './breadcumbs-tableros.component';

describe('BreadcumbsTablerosComponent', () => {
  let component: BreadcumbsTablerosComponent;
  let fixture: ComponentFixture<BreadcumbsTablerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcumbsTablerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcumbsTablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
