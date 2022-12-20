import { Component, Input } from '@angular/core';
import { User } from 'oidc-client-ts';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public currentUser: User | null = null;

  constructor(private readonly _authService: AuthService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  login(): void {

  }
  logout(): void {}

}
