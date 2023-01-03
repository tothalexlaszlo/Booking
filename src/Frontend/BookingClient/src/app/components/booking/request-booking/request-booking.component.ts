import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.scss']
})
export class RequestBookingComponent implements OnDestroy{
  @ViewChild('startDatePicker') startDatePicker: any;

  public readonly minDate: Date;
  public readonly maxDate: Date;
  public startDateControl = new FormControl(new Date());
  public duration: moment.Moment;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(private readonly _bookingService: BookingService) {
    // Starts at 01:00 at default, set it to 00:00
    this.duration = moment(-3600000);
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getTime() + (1000 * 60 * 60 * 24 * 2));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public tryGetBooking() {
    if (this.startDateControl.value) {
      this._subscription.unsubscribe();
      const startDate = this.startDateControl.value;
      const endDate = new Date(startDate.getTime() + this.duration.toDate().getTime() + 3600000);
                  //1 hour in milliseconds, to make up for the substraction in the beginning
      this._subscription = this._bookingService.bookParkingSlot(startDate, endDate)
        .subscribe({
          next: (value) => console.log(value),
          error: (err) => console.error(err)
        });
    }
  }
}
