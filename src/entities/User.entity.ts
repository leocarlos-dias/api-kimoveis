import { getRounds, hash } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./Schedule.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 45 })
    name: string

    @Column({ type: "varchar", length: 45, unique: true })
    email: string

    @Column({ type: "boolean", default: false })
    admin: boolean

    @Column({ type: "varchar", length: 120 })
    password: string

    @CreateDateColumn({ type: "text" })
    createdAt: Date

    @UpdateDateColumn({ type: "text" })
    updatedAt: Date

    @DeleteDateColumn({ type: "text", nullable: true })
    deletedAt: Date

    @OneToMany(() => Schedule, schedule => schedule.user)
    schedule: Schedule[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<string> {
        if (!getRounds(this.password))
            return this.password = await hash(this.password, 5);
        return this.password;
    }
}