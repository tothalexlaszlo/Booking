import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingListComponent } from './components/booking/booking-list/booking-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';

const routes: Routes = [
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'signout-callback', component: SignoutCallbackComponent },
  { path: 'app-profile', component: ProfileComponent },
  { path: 'bookings', component: BookingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
