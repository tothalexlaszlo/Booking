import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  template: `<p>Processing signin callback</p>`,
  styles: []
})
export class SigninCallbackComponent implements OnInit {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  async ngOnInit() {
    this._authService.userManager.signinCallback()
    .then(() => this._authService.initialize())
    .then(() => this._router.navigate(['booking']));
  }
}
