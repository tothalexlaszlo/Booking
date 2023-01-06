import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, combineLatest, filter, map, merge, scan, startWith, Subject, Subscription, tap } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';
import { BookingsByUserReply, BookingsByUserRequest } from '../protos/booking.pb';

@Component({
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnDestroy {
  private deletionSubject = new Subject<number>();
  private _subscription: Subscription = Subscription.EMPTY;

  public bookings$ = merge(this._bookingService.bookingsByUser$, this.deletionSubject)
  .pipe(
    scan((accumulator, value) => {
      if (typeof(value) === "number") {
        var index = (accumulator as BookingsByUserReply.BookingByUser[]).findIndex((element) => element.bookingId === value);
        (accumulator as BookingsByUserReply.BookingByUser[]).splice(index, 1);
        return accumulator;
      } else {
        return (accumulator as BookingsByUserReply.BookingByUser[]).concat(value);
      }
    }),
    map(x => x as BookingsByUserReply.BookingByUser[]),
    catchError(err => {
      throw err;
    })
  );

  constructor(private readonly _bookingService: BookingService, private _snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public cancelBooking(bookingId: number) {
    this._subscription.unsubscribe();
    this._snackBar.dismiss();
    this._subscription = this._bookingService.cancelBooking(bookingId)
      .subscribe({
        next: () => {
          this.deletionSubject.next(bookingId);
          this._snackBar.open(`Booking with id ${bookingId} has been cancelled`, undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 1000
          });
        },
        error: console.error
      });
  }
}
