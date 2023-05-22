import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class OTP{
    @Column()
    password: string;

    @Column() 
    expired: Date
    
}