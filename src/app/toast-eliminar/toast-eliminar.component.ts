import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-toast-eliminar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './toast-eliminar.component.html',
  styleUrl: './toast-eliminar.component.css'
})
export class ToastEliminarComponent {

  @Input() showToast: boolean = false;
  @Input() showToastError: boolean = false;

  showToastAndModal() {
    this.showToast = true;
    setTimeout(() => {
      this.hideToastAndModal();
    }, 3000);
  }

  showToastAndModalError() {
    this.showToastError = true;
    setTimeout(() => {
      this.showToastError = false;
    }, 3000);
  }

  hideToastAndModal() {
    this.showToast = false;
  }
}
