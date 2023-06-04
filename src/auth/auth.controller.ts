import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from "express"
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    @Post("/login")
    async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response,
    ) {
        loginDto = LoginDto.plainToClass(loginDto)
        try {
            let user = await this.userService.findUserByEmail(loginDto.email)
            if (user) {
                let match = await this.authService.signIn(loginDto.password, user.password)
                if (match) {
                    const payload = { sub: user.id, usermail: user.mail, type: "1" };
                    let access_token = await this.jwtService.signAsync(payload)
                    if (user.isActive) {
                        res.cookie('user', access_token)
                        return res.json({
                            login: true,
                            validate: true,
                            message: "You has been logged in !!!"
                        })
                    }
                    else {
                        res.cookie('validate', access_token)
                        return res.json({
                            login: true,
                            validate: false,
                            message: "You has been logged in !!!"
                        })
                    }

                }
            }
            return res.json({
                login: false,
                message: "Email or password is not match"
            })
        } catch (error) {
            return res.json({
                error: error.message
            })
        }
    }

    @Get("/logout")
    logout (@Res() res: Response) {
        res.clearCookie("user")
        return res.json({
            signOut: true,
            message: "You have been signed out"
        })
    }
}

