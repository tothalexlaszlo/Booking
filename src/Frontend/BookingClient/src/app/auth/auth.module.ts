import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
})

export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import it in the AppModule only`);
    }
  }
}
