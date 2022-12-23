import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { BookingModule } from './components/booking/booking.module';
import { AuthModule } from './services/auth/auth.module';

import { AppComponent } from './app.component';
import { SigninCallbackComponent } from './core/signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './core/signout-callback/signout-callback.component';
import { AuthService } from './services/auth/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninCallbackComponent,
    ProfileComponent,
    SignoutCallbackComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    AuthModule,
    BookingModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
