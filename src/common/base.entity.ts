import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class BaseEntity {

    @Column()
    createdAt: Date;

    @Column({nullable:true})
    updatedAt: Date;

    @Column({nullable:true})
    deletedAt: Date;
}