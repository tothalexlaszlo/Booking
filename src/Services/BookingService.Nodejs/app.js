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
require("reflect-metadata");
const express = require("express");
const data_source_1 = require("./data/data-source");
const booking_service_1 = require("./services/booking.service");
const debug = require('debug')('my express app');
const app = express();
app.use(express.json());
data_source_1.AppDataSource
    .initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization:", err));
const bookingService = new booking_service_1.BookingService();
//const grpcServer = new GrpcServer(bookingService);
//grpcServer.start(process.env.PORT || "3000");
app.get("/test", (req, res) => {
    res.send({ "SAJT": "sajt" });
});
app.get("/booking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = parseInt(req.query.userId.toString());
        if (isNaN(userId)) {
            res.status(400).send("userId parameter was missing or in incorrect format.");
        }
        let userBookings = yield bookingService.getUserBookings(userId);
        res.status(200).send(userBookings);
    }
    catch (error) {
        res.status(400).send("Error occured during fetching the requested resource.");
    }
}));
app.delete("/booking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bookingId = parseInt(req.query.bookingId.toString());
        if (isNaN(bookingId)) {
            res.status(400).send("bookingId parameter was missing or in incorrect format.");
        }
        yield bookingService.cancelBooking(bookingId);
        res.status(200).send("Booking successfully cancelled.");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.post("/booking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService.bookParkingSlot(req.body.userId, req.body.startDate, req.body.endDate);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
//# sourceMappingURL=app.js.map