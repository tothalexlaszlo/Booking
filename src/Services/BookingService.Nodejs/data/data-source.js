"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const booking_1 = require("../models/booking");
const parking_slot_1 = require("../models/parking-slot");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "SA",
    password: "Password1234",
    database: "Booking",
    synchronize: true,
    logging: true,
    entities: [booking_1.Booking, parking_slot_1.ParkingSlot],
    subscribers: [],
    migrations: [],
    extra: {
        trustServerCertificate: true
    }
});
//# sourceMappingURL=data-source.js.map