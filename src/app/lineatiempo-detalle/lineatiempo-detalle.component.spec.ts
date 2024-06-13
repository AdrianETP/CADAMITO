import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineatiempoDetalleComponent } from './lineatiempo-detalle.component';

describe('LineatiempoDetalleComponent', () => {
  let component: LineatiempoDetalleComponent;
  let fixture: ComponentFixture<LineatiempoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineatiempoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineatiempoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('despliega detalleTitle correcto', () => {
    component.detalleTitle = 'Detalle Title';
    expect(component.detalleTitle).toEqual('Detalle Title');
  });

  it('despliega detalleDesc correcto', () => {
    component.detalleDesc = 'Detalle Desc';
    expect(component.detalleDesc).toEqual('Detalle Desc');
  });
});
