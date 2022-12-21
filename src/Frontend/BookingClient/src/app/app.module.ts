import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from './services/auth/auth.module';

import { AppComponent } from './app.component';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BookingModule } from './components/booking/booking.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninCallbackComponent,
    ProfileComponent,
    SignoutCallbackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AuthModule,
    BookingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
