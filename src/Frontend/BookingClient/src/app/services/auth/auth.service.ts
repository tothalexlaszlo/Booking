import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userManager: UserManager;
  public currentUser: User | null = null;

  constructor() {
    const settings : UserManagerSettings = {
      authority: 'https://localhost:5001',
      client_id: 'web',
      redirect_uri: 'http://localhost:4200/signin-callback',
      silent_redirect_uri: 'http://localhost:4200/silent-callback.html',
      post_logout_redirect_uri: 'http://localhost:4200/signout-callback',
      response_type: 'code',
      scope: 'openid profile booking_api'
    };

    this.userManager = new UserManager(settings);
    console.log('AuthService constructed');

    this.initialize();
  }

  public initialize(): void {
    from(this.userManager.getUser()).subscribe(user => {
      this.currentUser = user;
      console.log('Got user');
    });
  }

  public async login(): Promise<void> {
    await this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
