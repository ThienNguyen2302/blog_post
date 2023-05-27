import { BaseEntity } from 'src/common/base.entity';
import { OTP } from 'src/otp/otp.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true
  })
  mail: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true
  })
  avatar: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  // @Column()
  // createAt: Date
  @OneToOne(() => OTP, otp => otp.userId)
  otp: OTP
}
