import { Component, EventEmitter, Output } from '@angular/core';
import { Tag } from '../types';
import { BotonEliminarComponent } from '../boton-eliminar/boton-eliminar.component';

@Component({
  selector: 'app-tag-select',
  standalone: true,
  imports: [],
  templateUrl: './tag-select.component.html',
  styleUrl: './tag-select.component.css'
})
export class TagSelectComponent {
  Tags: Tag[] = []
  @Output() TagsEmmitter: EventEmitter<Tag> = new EventEmitter<Tag>

  handleSubmit = (e: any) => {
    e.preventDefault()
    const taginput = (document.getElementById("taginput") as HTMLInputElement)
    const newTag: Tag = {
      Id: Math.random(),
      Nombre: taginput.value
    }

    this.Tags.push(newTag)

    taginput.value = ""

    this.TagsEmmitter.emit(newTag)

  }

  resetTags() {
    this.Tags = [];
  }

}
