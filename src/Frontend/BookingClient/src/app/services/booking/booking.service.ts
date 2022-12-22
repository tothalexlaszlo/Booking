import { Injectable } from '@angular/core';
import { Timestamp } from '@ngx-grpc/well-known-types';
import { map, Observable } from 'rxjs';

import {
  BookingReply,
  BookingRequest,
  BookingsByUserReply,
  BookingsByUserRequest,
  CancelBookingReply,
  CancelBookingRequest } from 'src/app/components/booking/protos/booking.pb';
import { GrpcBookingServiceClient } from 'src/app/components/booking/protos/booking.pbsc';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class BookingService {
  public bookingsByUser$ : Observable<BookingsByUserReply.BookingByUser[]> = this._gRpcClient
    .getActiveBookingsByUser(new BookingsByUserRequest({ userId: this._authService.currentUser?.profile.sub }))
    .pipe(map(bookingsReply => bookingsReply.bookingsByUser?.length ? bookingsReply.bookingsByUser : [] ));

  constructor(private _authService: AuthService, private readonly _gRpcClient: GrpcBookingServiceClient) {
    console.log('BookingService');
  }

  public cancelBooking(bookingId: number): Observable<CancelBookingReply> {
    return this._gRpcClient.cancelBooking(new CancelBookingRequest({ bookingId: bookingId}));
  }

  public bookParkingSlot(startDate: Date, endDate: Date): Observable<BookingReply> {
    const request = new BookingRequest(
      {
        userId: this._authService.currentUser?.profile.sub,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate)
      });

    return this._gRpcClient.bookParkingSlot(request);
  }
}
