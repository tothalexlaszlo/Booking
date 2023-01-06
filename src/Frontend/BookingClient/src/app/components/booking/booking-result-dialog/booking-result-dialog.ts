import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingResult } from './booking-result.model';

@Component({
  selector: 'app-booking-result-dialog',
  templateUrl: './booking-result-dialog.html',
  styleUrls: ['./booking-result-dialog.scss']
})
export class BookingResultDialog {
  public dialogTitle: string;

  constructor(public dialogRef: MatDialogRef<BookingResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BookingResult) {
      data.errorMessage ? this.dialogTitle = "Warning" : this.dialogTitle = "Success";
    }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
