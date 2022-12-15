import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client-ts';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BookingClient';
  public currentUser: User | null = null;

  constructor(private _authService: AuthService, private _router: Router) {
  }

  async ngOnInit(): Promise<void> {
    try{
      this.currentUser = await this._authService.getUser();
    }
    catch(error) {
      console.error(error);
    }

  }

  async login() : Promise<void> {
    await this._authService.login();
    const user = this._authService.getUser();
  }

  logout() : void {
    this._authService.logout();
  }
}
