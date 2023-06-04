import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())
  app.engine('hbs', hbs.engine({ 
    extname: 'hbs',
    layoutsDir:  join(__dirname, '..', 'views/layouts')
  }));
  app.setViewEngine('hbs',);
  await app.listen(process.env.PORT);
}
bootstrap();
