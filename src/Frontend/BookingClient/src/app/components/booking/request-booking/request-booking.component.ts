import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.scss']
})
export class RequestBookingComponent {
  @ViewChild('startDatePicker') startDatePicker: any;
  @ViewChild('endDatePicker') endDatePicker: any;

  public readonly minDate: Date;
  public readonly maxDate: Date;
  public readonly color: ThemePalette = 'primary';

  public startDateControl = new FormControl(new Date());
  public endDateControl = new FormControl(new Date());

  constructor() {
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getTime() + (1000 * 60 * 60 * 24 * 7));
  }
}
