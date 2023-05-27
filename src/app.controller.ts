import { Body, Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path'
import { type } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    console.log(path.join(__dirname, '../src/templates'))
    return { message: this.appService.getHello() };
  }

  @Get("/login")
  @Render("login")
  getLogin() {
    return
  }
}
