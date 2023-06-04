import {Controller, Get, Param, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import { OtpService } from './otp/otp.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
  ) { }

  @Get()
  @Render('index')
  getHello() {
    return { message: this.appService.getHello() };
  }

  @Get("/login")
  @Render("login")
  getLogin() {
    return
  }

  @Get("/validate/:type")
  @Render("validate")
  async validateForm(
    @Param('type') type: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    if (!req.cookies.validate) {
      return res.redirect("/login")
    }
    else {
      let validateInfo = await this.jwtService.verifyAsync(req.cookies.validate)
      this.otpService.resendOTP(validateInfo.sub, validateInfo.usermail, validateInfo.type)
      return { type: type }
    }
  }
}
