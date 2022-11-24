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
const grpc_js_1 = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const debug = require('debug')('my express app');
const app = express();
app.use(express.json());
try {
    data_source_1.AppDataSource.initialize();
}
catch (error) {
    console.error("Error ininializin data source:", error);
}
const bookingService = new booking_service_1.BookingService();
const grpcServer = getGrpcServer();
app.get("/booking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = parseInt(req.query.userId.toString());
        if (isNaN(userId)) {
            res.status(400).send("userId parameter was missing or in incorrect format.");
        }
        let userBookings = yield bookingService.getUserBookings(userId);
        if (userBookings.length) {
            res.status(200).send(userBookings);
        }
        else {
            res.status(204).send();
        }
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
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
function getGrpcServer() {
    let PROTO_PATH = __dirname + '/../../Shared/protos/booking.proto';
    let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    let protoDescriptor = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
    let bookingService = protoDescriptor.booking;
    let server = new grpc_js_1.Server();
    //server.addService(bookingService.GrpcBookingService.service, {
    //    })
    return server;
}
//# sourceMappingURL=app.js.map