import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public readonly _authService: AuthService) {
  }

  get currentUserJson(): string {
    return JSON.stringify(this._authService.currentUser, null, 2);
  }
}
