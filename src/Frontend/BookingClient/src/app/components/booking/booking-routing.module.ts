import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { CoreModule } from 'src/app/core/core.module';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';

const routes: Routes = [
  { path: '', component: BookingListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: RequestBookingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
