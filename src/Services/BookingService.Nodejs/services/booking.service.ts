import { Repository } from "typeorm";
import { Booking } from "../models/booking";
import { ParkingSlot } from "../models/parking-slot";
import { AppDataSource } from "../data/data-source";

export class BookingService {
    private _maximumAllowedBookingPeriod: number = 12 * 60 * 60 * 1000;

    private _bookingRepository: Repository<Booking> = AppDataSource
        .getRepository(Booking);
    private _parkingSlotRepository: Repository<ParkingSlot> = AppDataSource.getRepository(ParkingSlot);

    constructor() {

    }

    async getUserBookings(userId: number): Promise<Booking[] > {
        let bookings = this._bookingRepository.findBy({
            userId: userId
        });

        return bookings;
    }

    async bookParkingSlot(userId: number, startDate: Date, endDate: Date): Promise<string> {

        if (startDate.getTime() + 60 * 60 * 1000 > endDate.getTime()
            || endDate.getTime() - startDate.getTime() > this._maximumAllowedBookingPeriod){
                throw new Error("Invalid start or end date of requested booking");
            }

        let parkingSlots = await this._parkingSlotRepository.find();
        let bookingsForGivenTimePeriod = await AppDataSource
            .getRepository(Booking)
            .createQueryBuilder("booking")
            .where("booking.startDate > :startDate AND booking.endDate > :endDate", { startDate: startDate, endDate: endDate})
            .orWhere("booking.startDate > :startDate AND booking.endDate < :endDate", { startDate: startDate, endDate: endDate})
            .orWhere("booking.startDate < :startDate AND booking.endDate > :endDate", { startDate: startDate, endDate: endDate})
            .orWhere("booking.startDate < :startDate AND booking.endDate < :endDate", { startDate: startDate, endDate: endDate})
            .getMany();

        let currentlyBookedParkingSlots = bookingsForGivenTimePeriod.map(booking =>
            booking.parkingSlotId).filter(this.uniqueFilter);
        let freeSlots = parkingSlots.filter(parkingSlot =>
            !currentlyBookedParkingSlots.includes(parkingSlot.id))

        if (!freeSlots.length)
        {
            throw new Error("No free parking spots found");
        }

        let booking = new Booking();
        booking.parkingSlotId = freeSlots[0].id;
        booking.userId = userId;
        booking.startDate = startDate;
        booking.endDate = endDate;

        await this._bookingRepository.save(booking);
        return freeSlots[0].name;
     }

    async cancelBooking(bookingId: number): Promise<void> {
        await this._bookingRepository.delete({ id: bookingId });
    }

    private uniqueFilter(value: number, index: number, self: number[]): boolean {
        return self.indexOf(value) === index;
    }
 }
