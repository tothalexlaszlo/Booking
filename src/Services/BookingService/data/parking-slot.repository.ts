import { Repository } from "typeorm";
import { ParkingSlot } from "../models/parking-slot";
import { AppDataSource } from "./data-source";

export const ParkingSlotRepository: Repository<ParkingSlot> = AppDataSource.getRepository(ParkingSlot);