import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@ngx-grpc/well-known-types';

@Pipe({name: 'timestampToDate'})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: Timestamp | undefined): string {
    if (value instanceof Timestamp) {
      return value.toDate().toLocaleString();
    }
    return "Unknown date";
  }
}
