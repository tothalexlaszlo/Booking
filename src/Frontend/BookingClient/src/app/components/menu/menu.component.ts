import { Component, Input } from '@angular/core';
import { User } from 'oidc-client-ts';
import { from, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public currentUser: User | null = null;

  private _login$!: Subscription;

  constructor(private readonly _authService: AuthService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  login(): void {
    this._authService.login()
    .subscribe({
      next: validUser => this.currentUser = validUser,
      error: () => {
        //bad case
      }
    });
  }



  logout(): void {
  }

}
