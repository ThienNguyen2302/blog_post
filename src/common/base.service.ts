// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { BaseEntity } from './base.entity';

// @Injectable()
// export class BaseService {
//     constructor(private repository: Repository<BaseEntity>) { }

//     async create(entity: BaseEntity): Promise<BaseEntity> {
//         const createdEntity = await this.repository.save(entity);
//         return createdEntity;
//     }

//     async find(): Promise<BaseEntity[]> {
//         const entities = await this.repository.find();
//         return entities;
//     }

//     async findById(id: string): Promise<BaseEntity> {
//         const entity = await this.repository.findOne(
//             { where: { id: id } }
//         );
//         return entity;
//     }

//     async update(id: string, entity: BaseEntity): Promise<BaseEntity> {
//         await this.repository.update(id, entity);
//         const updatedEntity = await this.repository.findOne(id);
//         return updatedEntity;
//     }

//     async delete(id: string): Promise<void> {
//         await this.repository.delete(id);
//     }
// }