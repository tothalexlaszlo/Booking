import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookingsByUserReply, BookingsByUserRequest, CancelBookingRequest } from 'src/app/components/booking/protos/booking.pb';
import { GrpcBookingServiceClient } from 'src/app/components/booking/protos/booking.pbsc';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public bookingsByUser$ : Observable<BookingsByUserReply.BookingByUser[] | undefined> = this._gRpcClient
    .getActiveBookingsByUser(new BookingsByUserRequest({ userId: this._authService.currentUser?.profile.sub }))
    .pipe(map(bookingsReply => bookingsReply.bookingsByUser));

  constructor(private readonly _authService: AuthService, private readonly _gRpcClient: GrpcBookingServiceClient) {
  }

  public cancelBooking(bookingId: number) {
    this._gRpcClient.cancelBooking(new CancelBookingRequest({ bookingId: bookingId}));
  }
}
