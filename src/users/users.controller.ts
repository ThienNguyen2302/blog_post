import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { OtpService } from 'src/otp/otp.service';
import { JwtService } from '@nestjs/jwt';

enum ValidateType {
    ACTIVATE = "1",
    CHANGE_PASS = "2"
}

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly otpService: OtpService,
        private jwtService: JwtService
    ) { }

    @Post("/validate/:type")
    async validateOTP(
        @Param('type') type: string,
        @Body('code') code: string,
        @Req() req: Request,
        @Res() res: Response
    ) {
        if (req.cookies.validate) {
            let validateInfo = await this.jwtService.verifyAsync(req.cookies.validate)
            if (validateInfo.type != type) {
                return res.status(406).json({
                    message: "Request has not been initialized!!!"
                })
            }
            let result = await this.otpService.compare(code, validateInfo.sub)
            if (result.validation) {
                switch (type) {
                    case ValidateType.ACTIVATE:
                        await this.userService.activate(validateInfo.sub)
                        break;
                    case ValidateType.CHANGE_PASS:
                        break;
                }
            }
            return res.json(result)
        }
    }

    @Post()
    async createUser(
        @Body() info: CreateUserDto,
        @Res() res: Response,
        // @Req() req: Request
    ) {
        info = CreateUserDto.plainToClass(info)
        try {
            let user = await this.userService.create(info)
            if (user.id) {
                let result = await this.otpService.create(user)
                if (result) {
                    const payload = { sub: user.id, usermail: user.mail, type: "1" };
                    let access_token = await this.jwtService.signAsync(payload)
                    res.cookie('validate', access_token)
                    // res.cookie('activate', true)
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

