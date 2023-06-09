import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export abstract class OTP {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string;

    @Column()
    expired: Date

    @Column()
    userId: string

    @OneToOne(() => User, user => user.otp)
    @JoinColumn({name: "userId"})
    user: User
}