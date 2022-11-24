import { DataSource } from "typeorm";
import { Booking } from "../models/booking";
import { ParkingSlot } from "../models/parking-slot";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "SA",
    password: "Password1234",
    database: "Booking",
    synchronize: true,
    logging: true,
    entities: [Booking, ParkingSlot],
    subscribers: [],
    migrations: [],
    extra: {
        trustServerCertificate: true
        }
});
