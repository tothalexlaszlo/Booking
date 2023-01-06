import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: 'app-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'booking', loadChildren: () => import('./components/booking/booking.module').then(m => m.BookingModule) },
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
