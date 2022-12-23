import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  template: `<p>Processing signout callback</p>`,
  styles: []
})
export class SignoutCallbackComponent implements OnInit {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  async ngOnInit() {
    await this._authService.userManager.signoutCallback();
    this._authService.initialize();
    this._router.navigate(['']);
  }
}
