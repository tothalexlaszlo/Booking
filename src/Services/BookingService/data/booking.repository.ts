import { Repository } from "typeorm";
import { Booking } from "../models/booking";
import { AppDataSource } from "./data-source";

export const BookingRepository:Repository<Booking> = AppDataSource.getRepository(Booking);