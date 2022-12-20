import { Brackets, Repository } from "typeorm";
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

    async getUserBookings(userId: string): Promise<Booking[] > {
        let bookings = await this._bookingRepository.find({
            where: {
                userId: userId
            },
            relations: {
                parkingSlot: true
            }
        });

        return bookings;
    }

    async bookParkingSlot(userId: string, startDate: Date, endDate: Date): Promise<string> {

        if (startDate.getTime() + 60 * 60 * 1000 > endDate.getTime()) {
            throw new Error("Requested booking's period was below required minimum.");
            }
        if (endDate.getTime() - startDate.getTime() > this._maximumAllowedBookingPeriod) {
            throw new Error("Requested booking's period exceeds maximum duration.");
        }

        let parkingSlots = await this._parkingSlotRepository.find();

        let bookingsForGivenTimePeriod = await AppDataSource
            .getRepository(Booking)
            .createQueryBuilder("booking")
            .leftJoinAndSelect("booking.parkingSlot", "parkingSlot")
            .where(new Brackets((qb) => qb.where("booking.startDate > :startDate AND booking.endDate > :endDate AND booking.startDate < :endDate",
                { startDate: startDate, endDate: endDate})))
            .orWhere(new Brackets((qb) => qb.where("booking.startDate > :startDate AND booking.endDate < :endDate",
                { startDate: startDate, endDate: endDate})))
            .orWhere(new Brackets((qb) => qb.where("booking.startDate < :startDate AND booking.endDate > :endDate",
                { startDate: startDate, endDate: endDate})))
            .orWhere(new Brackets((qb) => qb.where("booking.startDate < :startDate AND booking.endDate < :endDate AND booking.endDate > :startDate",
                { startDate: startDate, endDate: endDate})))
            .printSql()
            .getMany();

        let currentlyBookedParkingSlots = bookingsForGivenTimePeriod.map(booking =>
            booking.parkingSlot.id).filter(this.uniqueFilter);
        let freeSlots = parkingSlots.filter(parkingSlot =>
            !currentlyBookedParkingSlots.includes(parkingSlot.id))

        if (!freeSlots.length)
        {
            throw new Error("No free parking spots found");
        }

        let booking = new Booking();
        booking.parkingSlot = freeSlots[0];
        booking.userId = userId;
        booking.startDate = startDate;
        booking.endDate = endDate;

        await this._bookingRepository.save(booking);
        return booking.parkingSlot.name;
     }

    async cancelBooking(bookingId: number): Promise<void> {
        await this._bookingRepository.delete({ id: bookingId });
    }

    private uniqueFilter(value: number, index: number, self: number[]): boolean {
        return self.indexOf(value) === index;
    }
 }
