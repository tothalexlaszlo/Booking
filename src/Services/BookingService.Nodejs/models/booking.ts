import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingSlot } from "./parking-slot";


@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @ManyToOne(type => ParkingSlot, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true })
    @JoinColumn()
    parkingSlot: ParkingSlot;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}
