import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';
import { Tag } from '../types';

@Component({
  selector: 'app-subtarea-tag',
  standalone: true,
  imports: [BotonEliminarComponent],
  templateUrl: './subtarea-tag.component.html',
  styleUrl: './subtarea-tag.component.css'
})
export class SubtareaTagComponent {
  @Input() tag: Tag = { Id: -1, Nombre: "" };

  @Output() deleteTag = new EventEmitter<string>();

  @ViewChild(BotonEliminarComponent) eliminarBoton!: BotonEliminarComponent;


  openModal() {
    this.eliminarBoton.openModal();
  }

  async handleDeleteTag(eliminar: Boolean) {
    if (eliminar) {
      console.log("tag: ", this.tag.Nombre);
      this.deleteTag.emit(this.tag.Nombre);
    }
  }


}
