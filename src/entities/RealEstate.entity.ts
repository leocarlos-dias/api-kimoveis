import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address.entity";
import { Category } from "./Category.entity";
import { Schedule } from "./Schedule.entity";

@Entity("real_state")
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "boolean", default: false })
    sold: boolean

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    value: number | string

    @Column({ type: "integer" })
    size: number

    @CreateDateColumn({ type: "text" })
    createdAt: Date

    @UpdateDateColumn({ type: "text" })
    updatedAt: Date

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category)
    category: Category;

    @OneToMany(() => Schedule, schedule => schedule.realEstate)
    schedules: Schedule[]
}