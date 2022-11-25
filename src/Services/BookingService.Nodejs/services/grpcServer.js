"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcServer = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const booking_grpc_pb_1 = require("../proto/booking_grpc_pb");
const booking_pb_1 = require("../proto/booking_pb");
const booking_service_1 = require("./booking.service");
const timestamp_pb_1 = require("google-protobuf/google/protobuf/timestamp_pb");
class GrpcServer {
    constructor() {
        this._bookingService = new booking_service_1.BookingService();
    }
    start(port) {
        this._server = new grpc_js_1.Server();
        this._server.addService(booking_grpc_pb_1.GrpcBookingServiceService, {
            bookParkingSlot: this.bookParkingSlot,
            cancelBooking: this.cancelBooking,
            getActiveBookingsByUser: this.getActiveBookingsByUser
        });
        this._server.bindAsync('0.0.0.0:' + port, grpc_js_1.ServerCredentials.createInsecure(), () => {
            this._server.start();
        });
    }
    bookParkingSlot(call, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let slotName = yield this._bookingService.bookParkingSlot(call.request.getUserid(), call.request.getStartdate().toDate(), call.request.getEnddate().toDate());
                let reply = new booking_pb_1.BookingReply();
                reply.setParkingslotname(slotName);
                callback(null, reply);
            }
            catch (error) {
                callback(error);
            }
        });
    }
    cancelBooking(call, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._bookingService.cancelBooking(call.request.getBookingid());
            let reply = new booking_pb_1.CancelBookingReply();
            reply.setSuccess(true);
            callback(null, reply);
        });
    }
    getActiveBookingsByUser(call, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userBookings = (yield this._bookingService.getUserBookings(call.request.getUserid()))
                    .map(booking => {
                    let bookingByUser = new booking_pb_1.BookingsByUserReply.BookingByUser();
                    bookingByUser.setParkingslotname(booking.parkingSlot.name);
                    let startDate = new timestamp_pb_1.Timestamp();
                    startDate.fromDate(booking.startDate);
                    bookingByUser.setStartdate(startDate);
                    let endDate = new timestamp_pb_1.Timestamp();
                    endDate.fromDate(booking.endDate);
                    bookingByUser.setEnddate(endDate);
                    return bookingByUser;
                });
                let reply = new booking_pb_1.BookingsByUserReply();
                reply.setBookingsbyuserList(userBookings);
                callback(null, reply);
            }
            catch (error) {
                callback(error);
            }
        });
    }
}
exports.GrpcServer = GrpcServer;
//# sourceMappingURL=grpcServer.js.map