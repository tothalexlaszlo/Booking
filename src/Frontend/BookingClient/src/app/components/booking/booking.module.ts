import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingService } from 'src/app/services/booking/booking.service';

import { TimestampToDatePipe } from './pipes/timestamp-date.pipe';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { CoreModule } from "../../core/core.module";

@NgModule({
    declarations: [
        BookingListComponent,
        TimestampToDatePipe,
        RequestBookingComponent
    ],
    providers: [BookingService],
    imports: [
        GrpcCoreModule.forRoot(),
        GrpcWebClientModule.forRoot({
            settings: { host: 'https://localhost:443' },
        }),
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatGridListModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BookingRoutingModule,
        CoreModule
    ]
})
export class BookingModule { }
