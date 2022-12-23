import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';

const routes: Routes = [
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'signout-callback', component: SignoutCallbackComponent },
  { path: 'app-profile', component: ProfileComponent },
  { path: 'booking', loadChildren: () => import('./components/booking/booking.module').then(m => m.BookingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
