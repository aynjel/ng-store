import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './layouts/nav/nav';
import { ToastComponent } from './layouts/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ToastComponent],
  template: `
    <app-nav />
    <main class="container mx-auto mt-20">
      <router-outlet />
    </main>
    <app-toast />
  `,
})
export class App {}
