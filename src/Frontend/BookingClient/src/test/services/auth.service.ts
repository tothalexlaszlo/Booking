import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';
import { from, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class MockAuthService {
  public userManager: UserManager;
  public _currentUser: User | null = null;

  constructor() {
    const originAuthService = new AuthService();
    this.userManager = originAuthService.userManager;
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  public async initialize(): Promise<void> {
    Promise.resolve();
  }

  public login(): Observable<User | null> {
    return of({access_token: 'userName'} as User);
  }

  public renewToken(): Promise<User | null> {
    const newToken = '';
    return Promise.resolve({access_token: newToken} as User);
  }

  public logout(): Promise<void> {
    return Promise.resolve();
  }
}
