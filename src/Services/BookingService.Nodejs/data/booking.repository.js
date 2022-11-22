"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const booking_1 = require("../models/booking");
const data_source_1 = require("./data-source");
exports.BookingRepository = data_source_1.AppDataSource.getRepository(booking_1.Booking);
//# sourceMappingURL=booking.repository.js.map