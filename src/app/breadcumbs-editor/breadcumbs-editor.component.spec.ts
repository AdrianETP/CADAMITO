import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumbsEditorComponent } from './breadcumbs-editor.component';

describe('BreadcumbsEditorComponent', () => {
  let component: BreadcumbsEditorComponent;
  let fixture: ComponentFixture<BreadcumbsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcumbsEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcumbsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
