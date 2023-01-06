import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  template: `<div>
              <mat-spinner></mat-spinner>
              <a>Redirecting</a>
            </div>`,
  styles: [`div { width: 100px; height: 100px;
    position: absolute; top:0; bottom: 0;
    left: 0; right: 0; margin: auto; text-align: center;}`]
})
export class SignoutCallbackComponent implements OnInit {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  ngOnInit() {
    this._authService.userManager.signoutCallback()
    .then(() => this._router.navigate(['welcome']))
    .catch(err => console.error(err));
  }
}
