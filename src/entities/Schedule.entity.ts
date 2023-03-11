import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./RealEstate.entity";
import { User } from "./User.entity";

@Entity("schedules")
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    date: string

    @Column({ type: "text" })
    hour: string

    @ManyToOne(() => User, user => user.schedule)
    user: User

    @ManyToOne(() => RealEstate, realEstate => realEstate.schedules)
    realEstate: RealEstate
}