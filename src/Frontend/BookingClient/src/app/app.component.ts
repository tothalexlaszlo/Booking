import { Component } from '@angular/core';
import { User } from 'oidc-client-ts';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookingClient';

  constructor(private _authService: AuthService) {
  }

  get currentUser() : User | null {
    return this._authService.currentUser;
  }

  async login() : Promise<void> {
    await this._authService.login();
  }

  logout() : void {
    this._authService.logout();
  }
}
