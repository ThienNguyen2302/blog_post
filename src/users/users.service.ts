import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }
    
    public async create(info: CreateUserDto): Promise<User> {
        try {
            let user = new User()
            user.firstName = info.firstName
            user.lastName = info.lastName
            user.mail = info.mail
            user.password = await bcrypt.hash(info.password, 10)
            user.createdAt = new Date()
            return await this.usersRepository.save(user)
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('The email is already registered!!');
            } else {
                throw new Error(error)
            }
        }
    }

    async activate(user_id) {
        try {
            let  user = await this.usersRepository.save({
                id: user_id,
                isActive: true,
                updatedAt: new Date()
            });

            if(!user.isActive) {
                return false;
            }

            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async findUserByEmail(email: string) {
        try {
            let user = await this.usersRepository.findOneBy({
                mail: email
            })
            if(!user) {
                return null;
            }
            return user
        } catch (error) {
            console.log(error)
            throw new Error("An error has been occur")
        }
        
    }
    
}
