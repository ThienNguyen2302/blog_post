import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UsersService } from './users.service';
import { OtpService } from 'src/otp/otp.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly otpService: OtpService
    ) { }


    @Post()
    async createUser(
        @Body() info: CreateUserDto,
        @Res() res: Response
    ) {
        info = CreateUserDto.plainToClass(info)
        try {
            let user = await this.userService.create(info)
            if (user.id) {
                let result = await this.otpService.create(user)
                if (result) {
                    res.json({
                        isCreated: true
                    })
                }
            }
            else {
                return res.json({
                    isCreated: false
                })
            }
        }
        catch (error) {
            console.log(error)
            return res.json({
                isCreated: false,
                error: error.message
            })
        }
    }
}

