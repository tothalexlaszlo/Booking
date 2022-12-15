import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'signin-callback', component: SigninCallbackComponent },
  { path: 'signout-callback', component: SignoutCallbackComponent },
  { path: 'app-profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
