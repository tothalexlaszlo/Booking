import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from './auth/auth.module';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { ProfileComponent } from './profile/profile.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninCallbackComponent,
    ProfileComponent,
    SignoutCallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
