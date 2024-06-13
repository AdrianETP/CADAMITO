import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesComponent } from './roles.component';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RolesComponent, // Importa el componente standalone
        SidebarTaskmanagerComponent,
        RouterModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } } // Provee ActivatedRoute con un valor simulado
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  /* it('should sort usuarios by name in ascending order', () => {
    const dummyUsuarios = [
      { usuarioId: 1, usuarioNombre: 'Juan', usuarioCorreo: 'juan@tec.mx', usuarioDepartamento: 'test1', usuarioRol: 'Administrador', isEditing: false },
      { usuarioId: 2, usuarioNombre: 'Michael Jackson', usuarioCorreo: 'mj@tec.mx', usuarioDepartamento: 'Pruebas de vehiculo', usuarioRol: 'Miembro', isEditing: false },
      { usuarioId: 3, usuarioNombre: 'Benito Bunny', usuarioCorreo: 'goatbunny@tec.mx', usuarioDepartamento: 'test1', usuarioRol: 'Administrador', isEditing: false },
      { usuarioId: 4, usuarioNombre: 'Max Verstappen', usuarioCorreo: 'redbullsucks@tec.mx', usuarioDepartamento: 'Pruebas de vehiculo', usuarioRol: 'Miembro', isEditing: false }
    ];
    //component.usuarios = dummyUsuarios;
  
    component.sortBy('usuarioNombre', 'asc', new Event('click'));
    fixture.detectChanges();
  
    const sortedUsuarios = component.usuarios.map(u => u.usuarioNombre);
    expect(sortedUsuarios).toEqual(['Benito Bunny', 'Juan', 'Max Verstappen', 'Michael Jackson']);
  });
  
  it('should cancel edit', () => {
    const usuario = {
      usuarioId: 1,
      usuarioNombre: 'Juan',
      usuarioCorreo: 'juan@tec.mx',
      usuarioDepartamento: 'test1',
      usuarioRol: 'Administrador',
      isEditing: true
    };
  
    //component.originalUsuarios = [{
      //...usuario,
      //usuarioNombre: 'Original Juan'
    //}];
  
    //component.cancelEdit(usuario);
    expect(usuario.usuarioNombre).toBe('Original Juan');
    expect(usuario.isEditing).toBeFalse(); */
  //});
});
