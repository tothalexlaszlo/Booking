import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';

const routes: Routes = [
  { path: '', component: BookingListComponent },
  { path: 'new', component: RequestBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
