import "reflect-metadata";

import * as express from 'express';
import { AddressInfo } from "net";
import { AppDataSource } from "./data/data-source";
import { BookingService } from "./services/booking.service";

const debug = require('debug')('my express app');
const app = express();

app.use(express.json())

try{
    AppDataSource.initialize();
} catch(error) {
    console.error("Error ininializin data source:", error)
}

const bookingService = new BookingService();

app.get("/booking", async (req, res) =>{
    try{
        let userId = parseInt(req.query.userId.toString());

        if (isNaN(userId)) {
            res.status(400).send("userId parameter was missing or in incorrect format.");
        }

        let userBookings = await bookingService.getUserBookings(userId);

        if (userBookings.length) {
            res.status(200).send(userBookings);
        } else {
            res.status(204).send();
        }
    } catch(error) {
        res.status(400).send("Error occured during fetching the requested resource.");
    }
});

app.delete("/booking", async (req, res) =>{
    try{
        let bookingId = parseInt(req.query.bookingId.toString());

        if (isNaN(bookingId)) {
            res.status(400).send("bookingId parameter was missing or in incorrect format.");
        }

        await bookingService.cancelBooking(bookingId);
        res.status(200).send("Booking successfully cancelled.");

    } catch(error) {
        res.status(400).send(error.message);
    }
});

app.post("/booking", async (req, res) =>{
    try{
        await bookingService.bookParkingSlot(req.body.userId,
                req.body.startDate, req.body.endDate);
    } catch(error) {
        res.status(400).send(error.message);
    }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err[ 'status' ] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});
