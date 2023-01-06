import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    SigninCallbackComponent,
    SignoutCallbackComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
