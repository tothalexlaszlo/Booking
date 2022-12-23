import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { User } from 'oidc-client-ts';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnChanges {
  @Input() public currentUser: User | null = null;

  public isUserLoggedIn = false;

  constructor(private readonly _authService: AuthService) {
  }

  ngOnChanges(): void {
    this.isUserLoggedIn = this._isUserAuthValid();
  }

  login(): void {
    this._authService.login();
  }

  logout(): void {
    this._authService.logout()
    .then(() => {
      this.currentUser = null;
      this.isUserLoggedIn = this._isUserAuthValid();
    });
  }

  /**
   * Returns true if the currentUser exists and it has token.
   * @returns boolean
   */
  private _isUserAuthValid(): boolean {
    return !!this.currentUser && this.currentUser.access_token.length > 0;
  }
}
