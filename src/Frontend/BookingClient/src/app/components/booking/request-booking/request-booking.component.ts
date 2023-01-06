import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GrpcStatusEvent } from '@ngx-grpc/common';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/services/booking/booking.service';
import { BookingResultDialog } from '../booking-result-dialog/booking-result-dialog';
import { BookingResult } from '../booking-result-dialog/booking-result.model';
import { BookingReply } from '../protos/booking.pb';

@Component({
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.scss']
})
export class RequestBookingComponent implements OnDestroy{

  public readonly minDate: moment.Moment;
  public readonly maxDate: moment.Moment;
  public startDateControl = new FormControl(moment());
  public duration: moment.Moment;

  private _subscription: Subscription = Subscription.EMPTY;

  constructor(private readonly _bookingService: BookingService, public dialog: MatDialog) {
    this.duration = moment(0);
    this.minDate = moment();
    this.maxDate = moment(new Date(this.minDate.toDate().getTime() + (1000 * 60 * 60 * 24 * 2)));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public tryGetBooking() {
    if (this.startDateControl.value) {
      this._subscription.unsubscribe();
      const startDate = this.startDateControl.value.toDate();
      const endDate = new Date(startDate.getTime() + this.duration.toDate().getTime() + 3600000);
                  //1 hour in milliseconds, to make up 01:00 being the 0th millisecond`
      this._subscription = this._bookingService.bookParkingSlot(startDate, endDate)
        .subscribe({
          next: (value: BookingReply) => {
            this.openDialog(new BookingResult(value.parkingSlotName, startDate, endDate));
          },
          error: (err) => {
            console.error(err);
            if (err instanceof GrpcStatusEvent) {
              this.openDialog(new BookingResult(undefined,undefined,undefined,err.statusMessage));
            }
          }
        });
    }
  }

  private openDialog(result: BookingResult) {
    this.dialog.open(BookingResultDialog, {data: result});
  }
}
