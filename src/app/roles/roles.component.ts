import { Component, OnInit } from '@angular/core';
import { SidebarTaskmanagerComponent } from '../sidebar-taskmanager/sidebar-taskmanager.component';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  usuarioId: number;
  usuarioNombre: string;
  usuarioCorreo: string;
  usuarioDepartamento: string;
  usuarioRol: string;
  departamentoId: number;
  isEditing: boolean;
}

interface Departamento {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    SidebarTaskmanagerComponent,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  usuarios: Usuario[] = [];
  originalUsuarios: Usuario[] = []; // Lista para almacenar los datos originales
  departamentos: Departamento[] = [];
  rolesList = ['Miembro', 'Administrador'];

  selectedUsuario: Usuario | null = null;
  showNombreDropdown: boolean = false;
  showCorreoDropdown: boolean = false;
  showDepartamentoDropdown: boolean = false;
  showRolDropdown: boolean = false;
  isModalOpen: boolean = false;  // Controla el estado del modal

  selectedDepartamentos: string[] = [];
  selectedRoles: string[] = [];
  
  searchText: string = ''; // Variable para almacenar el texto de búsqueda

  constructor() {}

  ngOnInit() {
    this.loadUsuariosYDepartamentos();
  }

  async loadDepartamentos() {
    try {
      const res = await fetch('https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/departamento/');
      const data = await res.json();
      this.departamentos = data.items.map((item: { id: number; nombre: string }) => ({
        id: item.id,
        nombre: item.nombre
      }));
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  }

  async loadUsuarios() {
    try {
      const res = await fetch('https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/api/usersinfo');
      const data = await res.json();
      this.usuarios = (data.items ? data.items : []).map((item: { id: any; nombre: any; correo: any; rol: any; departamento_nombre: any; departamento_id: any }) => ({
        usuarioId: item.id,
        usuarioNombre: item.nombre,
        usuarioCorreo: item.correo,
        usuarioRol: item.rol,
        usuarioDepartamento: item.departamento_nombre,
        departamentoId: item.departamento_id,
        isEditing: false
      }));
      this.originalUsuarios = JSON.parse(JSON.stringify(this.usuarios)); // Copia profunda de los datos originales
    } catch (error) {
      console.error("Error al traer datos de usuarios:", error);
    }
  }

  async loadUsuariosYDepartamentos() {
    await this.loadDepartamentos();  // Cargar departamentos primero
    await this.loadUsuarios();       // Luego cargar usuarios
  }

  openModal(usuario: Usuario) {
    this.selectedUsuario = usuario;
    this.isModalOpen = true;  // Abrir modal
  }

  closeModal() {
    this.isModalOpen = false;  // Cerrar modal
    this.selectedUsuario = null;
  }

  async deleteUsuario(usuario: Usuario): Promise<void> {
    const url = `https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/usuario/${usuario.usuarioId}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Usuario eliminado correctamente', result);

      // Eliminar el usuario de la lista localmente
      this.usuarios = this.usuarios.filter(u => u.usuarioId !== usuario.usuarioId);
      this.originalUsuarios = this.originalUsuarios.filter(u => u.usuarioId !== usuario.usuarioId);

      this.closeModal(); // Cerrar el modal después de eliminar el usuario
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      alert('Error al eliminar el usuario. Por favor, inténtalo de nuevo.');
    }
  }

  toggleDropdown(menu: string): void {
    this.showNombreDropdown = menu === 'nombre' ? !this.showNombreDropdown : false;
    this.showCorreoDropdown = menu === 'correo' ? !this.showCorreoDropdown : false;
    this.showDepartamentoDropdown = menu === 'departamento' ? !this.showDepartamentoDropdown : false;
    this.showRolDropdown = menu === 'rol' ? !this.showRolDropdown : false;
  }

  closeDropdowns(): void {
    this.showNombreDropdown = false;
    this.showCorreoDropdown = false;
    this.showDepartamentoDropdown = false;
    this.showRolDropdown = false;
  }

  toggleEdit(usuario: Usuario): void {
    usuario.isEditing = !usuario.isEditing;
  }

  getDepartamentoId(nombre: string): number | null {
    const departamento = this.departamentos.find(dept => dept.nombre === nombre);
    return departamento ? departamento.id : null;
  }

  async saveChanges(usuario: Usuario): Promise<void> {
    const departamentoId = this.getDepartamentoId(usuario.usuarioDepartamento);
    
    if (departamentoId === null) {
      alert('Departamento no encontrado.');
      return;
    }

    const url = `https://g12f9a6e8789e60-fsaetrackmasterdb.adb.mx-queretaro-1.oraclecloudapps.com/ords/admin/usuario/${usuario.usuarioId}`;
    const data = {
      nombre: usuario.usuarioNombre,
      correo: usuario.usuarioCorreo,
      rol: usuario.usuarioRol,
      departamento_id: departamentoId
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Cambios guardados correctamente', result);

      // Actualizar la lista de usuarios con los datos editados
      const updatedUser = this.usuarios.find(u => u.usuarioId === usuario.usuarioId);
      if (updatedUser) {
        updatedUser.usuarioNombre = usuario.usuarioNombre;
        updatedUser.usuarioRol = usuario.usuarioRol;
        updatedUser.usuarioDepartamento = usuario.usuarioDepartamento;
        updatedUser.isEditing = false;
      }

    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar cambios. Por favor, inténtalo de nuevo.');
    }
  }

  cancelEdit(usuario: Usuario): void {
    // Restaurar los datos originales del usuario
    const originalUser = this.originalUsuarios.find(u => u.usuarioId === usuario.usuarioId);
    if (originalUser) {
      usuario.usuarioNombre = originalUser.usuarioNombre;
      usuario.usuarioCorreo = originalUser.usuarioCorreo;
      usuario.usuarioDepartamento = originalUser.usuarioDepartamento;
      usuario.usuarioRol = originalUser.usuarioRol;
    }
    usuario.isEditing = false;
  }

  sortBy(field: keyof Usuario, direction: 'asc' | 'desc', event: Event): void {
    event.preventDefault();
    this.usuarios.sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.closeDropdowns(); // Cerrar dropdown después de ordenar
  }

  onDepartamentoChange(departamento: string, event: any): void {
    if (event.target.checked) {
      this.selectedDepartamentos.push(departamento);
    } else {
      this.selectedDepartamentos = this.selectedDepartamentos.filter(d => d !== departamento);
    }
  }

  onRolChange(rol: string, event: any): void {
    if (event.target.checked) {
      this.selectedRoles.push(rol);
    } else {
      this.selectedRoles = this.selectedRoles.filter(r => r !== rol);
    }
  }

  filterUsuarios(): Usuario[] {
    return this.usuarios.filter(usuario => {
      const departamentoMatch = this.selectedDepartamentos.length === 0 || this.selectedDepartamentos.includes(usuario.usuarioDepartamento);
      const rolMatch = this.selectedRoles.length === 0 || this.selectedRoles.includes(usuario.usuarioRol);
      const searchMatch = usuario.usuarioNombre.toLowerCase().includes(this.searchText.toLowerCase());
      return departamentoMatch && rolMatch && searchMatch;
    });
  }
}
