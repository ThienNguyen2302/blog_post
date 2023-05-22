import { BaseEntity } from 'src/common/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

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
}
