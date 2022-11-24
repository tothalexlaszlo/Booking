"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSlotRepository = void 0;
const parking_slot_1 = require("../models/parking-slot");
const data_source_1 = require("./data-source");
exports.ParkingSlotRepository = data_source_1.AppDataSource.getRepository(parking_slot_1.ParkingSlot);
//# sourceMappingURL=parking-slot.repository.js.map