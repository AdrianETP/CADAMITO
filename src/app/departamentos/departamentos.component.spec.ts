import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DepartamentosComponent } from './departamentos.component';

describe('DepartamentosComponent', () => {
  let component: DepartamentosComponent;
  let fixture: ComponentFixture<DepartamentosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DepartamentosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'someValue' }),
          }
        }
      ]
    })
      .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
