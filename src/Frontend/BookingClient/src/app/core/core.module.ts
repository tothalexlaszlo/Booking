import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninCallbackComponent } from './signin-callback/signin-callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    SigninCallbackComponent,
    SignoutCallbackComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
