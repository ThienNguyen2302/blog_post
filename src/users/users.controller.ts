import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    async createUser(
        @Body() user: CreateUserDto,
        @Res() res: Response
    ) {
        user = CreateUserDto.plainToClass(user)
        try {
            let result = await this.userService.create(user)
            res.json({
                isCreated: result
            })
        }
        catch (error) {
            return res.json({
                error: error
            })
        }
    }
}

