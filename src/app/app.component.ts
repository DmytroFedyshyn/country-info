import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
  <mat-toolbar color="primary">Country Info</mat-toolbar>
  <div class="app-shell">
    <router-outlet />
  </div>
`,
styles: [`
  :host { display:block; }
  .app-shell {
    max-width: 1040px;
    width: calc(100% - 32px);
    height: calc(100vh - 64px);
    overflow: auto;
    max-width: 1040px;
    margin: 0 auto;
    padding: 16px;
  }

  @media (max-width: 959px) {
    .app-shell { height: calc(100vh - 56px); }
  }
`]
})
export class AppComponent {}
