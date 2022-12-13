import "reflect-metadata";

import * as express from 'express';
import { AddressInfo } from "net";
import { AppDataSource } from "./data/data-source";
import { GrpcServer } from "./services/grpcServer";
import { BookingService } from "./services/booking.service";

const debug = require('debug')('my express app');
const app = express();

app.use(express.json())

AppDataSource
    .initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization:", err));

const bookingService = new BookingService();
//const grpcServer = new GrpcServer(bookingService);
//grpcServer.start(process.env.PORT || "3000");

app.get("/test", (req,res) =>{
    res.send({"SAJT": "sajt"})
})

app.get("/booking", async (req, res) => {
    try {
        let userId = parseInt(req.query.userId.toString());

        if (isNaN(userId)) {
            res.status(400).send("userId parameter was missing or in incorrect format.");
        }

        let userBookings = await bookingService.getUserBookings(userId);
        res.status(200).send(userBookings);

    } catch (error) {
        res.status(400).send("Error occured during fetching the requested resource.");
    }
});

app.delete("/booking", async (req, res) => {
    try {
        let bookingId = parseInt(req.query.bookingId.toString());

        if (isNaN(bookingId)) {
            res.status(400).send("bookingId parameter was missing or in incorrect format.");
        }

        await bookingService.cancelBooking(bookingId);
        res.status(200).send("Booking successfully cancelled.");

    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/booking", async (req, res) => {
    try {
        await bookingService.bookParkingSlot(req.body.userId,
            req.body.startDate, req.body.endDate);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});

