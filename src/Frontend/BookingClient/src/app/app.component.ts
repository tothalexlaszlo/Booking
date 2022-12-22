import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client-ts';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'BookingClient';
  public currentUser: User | null;

  constructor(private _authService: AuthService) {
    this.currentUser = null;
  }

  ngOnInit(): void {
    this._authService.initialize()
    .then(() => this._login())
    .then(() => this.currentUser = this._authService.currentUser)
    .catch(() => this.currentUser = null)
  }

  private async _login() : Promise<void> {
    await this._authService.login();
  }
}
