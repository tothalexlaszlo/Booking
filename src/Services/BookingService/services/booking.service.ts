import { Repository } from "typeorm";
import { BookingRepository } from "../data/booking.repository";
import { Booking } from "../models/booking";

class BookingService {
    constructor(private _bookingRepository: Repository<Booking>) { }

    async getUserBookings(userId: number): Promise<Booking[]> {
        let bookings = this._bookingRepository.find();
        return bookings;
    }

    bookParkingSlot(userId: number, startDate: Date, endDate: Date): void {

        //TODO: get free parking spaces

        let booking = new Booking();
     }

    async cancelBooking(userId: number, bookingId: number): Promise<void> {
    }
 }