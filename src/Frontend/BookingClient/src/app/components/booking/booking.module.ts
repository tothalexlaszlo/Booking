import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from './booking-list/booking-list.component';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingService } from 'src/app/services/booking/booking.service';

@NgModule({
  declarations: [
    BookingListComponent
  ],
  imports: [
    GrpcCoreModule.forRoot(),
    GrpcWebClientModule.forRoot({
      settings: { host: 'https://localhost:443' },
    }),
    CommonModule,
    BookingRoutingModule
  ],
  providers: [BookingService]
})
export class BookingModule { }
