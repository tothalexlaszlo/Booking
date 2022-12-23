import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { User } from 'oidc-client-ts';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title = 'BookingClient';
  public currentUser: User | null = null;
  private _cleanup: Subscription = Subscription.EMPTY;

  constructor(private _authService: AuthService) {
    this._cleanup = this._authService.loggedInUser$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this._cleanup.unsubscribe();
  }

}
