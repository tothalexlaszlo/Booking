import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSlot } from "./parking-slot";


@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToOne(type => ParkingSlot, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    parkingSlot: ParkingSlot;

    parkingSlotId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
