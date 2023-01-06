export class BookingResult {
  public parkingSpot?: string;
  public startDate?: Date;
  public endDate?: Date;
  public errorMessage?: string

  constructor(parkingSpot?: string, startDate?: Date, endDate?: Date, errorMessage?:string){
    this.parkingSpot = parkingSpot;
    this.startDate = startDate;
    this.endDate = endDate;
    this.errorMessage = errorMessage;
  }
}
