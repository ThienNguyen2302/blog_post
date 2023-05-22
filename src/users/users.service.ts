import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    
    public async create(info: any) {
        try {
            info.createdAt = new Date()
            let user: User = await this.usersRepository.save(info)
            if(user.id) {
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(error)
        }
    }
    
}
