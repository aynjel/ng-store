import { Injectable, signal } from '@angular/core';
import { Toast } from '../models/common.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  private counter = 0;

  show(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const id = this.counter++;
    const newToast: Toast = {
      id,
      message,
      type,
      duration,
    };
    this.toasts.set([...this.toasts(), newToast]);
    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: number) {
    this.toasts.set(this.toasts().filter((t) => t.id !== id));
  }
}
