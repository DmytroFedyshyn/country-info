import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">Country Info</mat-toolbar>

    <div class="app-container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1000px;
      margin: 24px auto;
      padding: 0 16px;
    }
  `]
})
export class AppComponent {}
