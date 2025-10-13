import { Component, ElementRef, input, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @ViewChild('modal', { static: true })
  private dialogRef!: ElementRef<HTMLDialogElement>;

  title = input.required<string>();

  closeEmitter = output<string>();

  open(): void {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    // Use showModal when available for modal behavior
    if (typeof dialog.showModal === 'function') {
      try {
        dialog.showModal();
      } catch (e) {
        // If already open or error, fallback to show
        if (typeof dialog.show === 'function') dialog.show();
      }
    } else if (typeof dialog.show === 'function') {
      dialog.show();
    }
  }

  close(): void {
    const dialog = this.dialogRef.nativeElement;
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
      this.closeEmitter.emit('closed');
    }
  }
}
