import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class Modal {
  /** Controls modal visibility. Use two-way binding: [(visible)]="myVisible" */
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  /** Title is required for the modal header */
  @Input({ required: true }) title!: string;

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onBackdropClick() {
    this.close();
  }
}
