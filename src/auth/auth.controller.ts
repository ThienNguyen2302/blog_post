import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
    }

    @Post("/login")
    async create(@Body() loginDto: LoginDto) {
        loginDto = LoginDto.plainToClass(loginDto)
        console.log(loginDto)
        return "You have been logged in"
    }
}

