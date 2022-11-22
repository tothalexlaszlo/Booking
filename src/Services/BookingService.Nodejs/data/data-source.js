"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const booking_1 = require("../models/booking");
const parking_slot_1 = require("../models/parking-slot");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 3333,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [booking_1.Booking, parking_slot_1.ParkingSlot],
    subscribers: [],
    migrations: []
});
//# sourceMappingURL=data-source.js.map