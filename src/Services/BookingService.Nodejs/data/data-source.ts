import { DataSource } from "typeorm";
import { Booking } from "../models/booking";
import { ParkingSlot } from "../models/parking-slot";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 3333,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Booking, ParkingSlot],
    subscribers: [],
    migrations: []
});