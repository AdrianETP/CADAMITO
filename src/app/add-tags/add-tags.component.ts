import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Tag } from '../types';
import { NgIf } from '@angular/common';
import { TagSelectComponent } from '../tag-select/tag-select.component';

@Component({
  selector: 'app-add-tags',
  standalone: true,
  imports: [NgIf, TagSelectComponent],
  templateUrl: './add-tags.component.html',
  styleUrl: './add-tags.component.css'
})
export class AddTagsComponent {
  @Input() ModalId: number;
  @Output() newTags = new EventEmitter<Tag[]>();
  @ViewChild(TagSelectComponent) tagSelectComponent!: TagSelectComponent;
  tags: Tag[] = [];
  modalOpen = false;

  closeModal() {
    this.modalOpen = false;
    const modal = document.getElementById('my_modal_tags') as HTMLDialogElement;
    modal.close();
  }

  onNewTag(tag: Tag) {
    this.tags.push(tag);
  }

  Addtag() {
    this.newTags.emit(this.tags);
    this.tagSelectComponent.resetTags();
    this.tags = [];
    this.closeModal();
  }

  constructor() {
    this.ModalId = 0;
  }
}
