import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSlot } from "./parking-slot";


@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @OneToOne(() => ParkingSlot, (slot) => slot.id, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    parkingSlotId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
