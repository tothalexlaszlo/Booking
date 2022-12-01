import { sendUnaryData, Server, ServerUnaryCall, ServerCredentials } from "@grpc/grpc-js";
import { GrpcBookingServiceService } from "../proto/booking_grpc_pb";
import
{
    BookingReply,
    BookingRequest,
    BookingsByUserReply,
    BookingsByUserRequest,
    CancelBookingReply,
    CancelBookingRequest
} from "../proto/booking_pb";
import { BookingService } from "./booking.service";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

export class GrpcServer {
    private _server: Server;
    private _bookingService: BookingService;

    constructor() {
        this._bookingService = new BookingService();
    }

    //https://stackoverflow.com/questions/58687918/javascripts-scope-this-in-typescripts-class
    public start(port: string): void {
        this._server = new Server();
        this._server.addService(GrpcBookingServiceService, {
            bookParkingSlot: this.bookParkingSlot.bind(this),
            cancelBooking: this.cancelBooking.bind(this),
            getActiveBookingsByUser: this.getActiveBookingsByUser.bind(this)
        });

        this._server.bindAsync("localhost:" + port, ServerCredentials.createInsecure(), () => {
            this._server.start();
        });
    }

    private async bookParkingSlot(call: ServerUnaryCall<BookingRequest, BookingReply>,
        callback: sendUnaryData<BookingReply>): Promise<void> {
        try {
            let slotName = await this._bookingService.bookParkingSlot(call.request.getUserid(), call.request.getStartdate().toDate(), call.request.getEnddate().toDate());
            let reply = new BookingReply();
            reply.setParkingslotname(slotName);

            callback(null, reply);
        } catch (error) {
            callback(error);
        }
    }

    private async cancelBooking(call: ServerUnaryCall<CancelBookingRequest, CancelBookingReply>,
        callback: sendUnaryData<CancelBookingReply>): Promise<void> {
        await this._bookingService.cancelBooking(call.request.getBookingid());
        let reply = new CancelBookingReply();
        reply.setSuccess(true);

        callback(null, reply);
    }

    private async getActiveBookingsByUser(call: ServerUnaryCall<BookingsByUserRequest, BookingsByUserReply>,
        callback: sendUnaryData<BookingsByUserReply>): Promise<void> {
        try {
            let userBookings = (await this._bookingService.getUserBookings(call.request.getUserid()))
                .map(booking => {
                    let bookingByUser = new BookingsByUserReply.BookingByUser();
                    bookingByUser.setParkingslotname(booking.parkingSlot.name);

                    let startDate = new Timestamp();
                    startDate.fromDate(booking.startDate);
                    bookingByUser.setStartdate(startDate);

                    let endDate = new Timestamp();
                    endDate.fromDate(booking.endDate);
                    bookingByUser.setEnddate(endDate);

                    return bookingByUser;
                });

            let reply = new BookingsByUserReply();
            reply.setBookingsbyuserList(userBookings);

            callback(null, reply);
        } catch (error) {
            callback(error);
        }
    }
}
