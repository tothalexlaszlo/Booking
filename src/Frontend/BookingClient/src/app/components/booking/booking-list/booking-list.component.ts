import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject, Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnDestroy {
  private cancellationSubject = new BehaviorSubject<boolean>(true);
  private _subscription: Subscription = Subscription.EMPTY;

  public bookings$ = combineLatest([
    this._bookingService.bookingsByUser$,
    this.cancellationSubject
  ]).pipe(map((value) => value[0]));

  constructor(private readonly _bookingService: BookingService) {
    console.log('BookingList');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public cancelBooking(bookingId: number) {
    this._subscription.unsubscribe();
    this._bookingService.cancelBooking(bookingId)
      .subscribe({
        next: () => this.cancellationSubject.next(true),
        error: console.error
      });
  }
}
