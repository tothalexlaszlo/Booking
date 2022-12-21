import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent {
  public bookings$ = this._bookingService.bookingsByUser$;

  constructor(private readonly _bookingService: BookingService) {
    console.log('BookingList');
  }

  public cancelBooking(bookingId: number) {
    this._bookingService.cancelBooking(bookingId);
  }
}
