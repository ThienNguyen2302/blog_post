import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeverGateway } from './socket/sever.gateway';
import { PostsModule } from './posts/posts.module';
import { ReactionsModule } from './reactions/reactions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { OtpModule } from './otp/otp.module';
import { OTP } from './otp/otp.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    ReactionsModule,
    OtpModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      // signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        User, OTP
      ],
      // synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: "stmp.gmail.com",
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASS,
        }
      },
      defaults: {
        from: '"Noreply" <nguyenngocthien749@gmail.com>',
      },
      template: {
        dir: path.join(__dirname, '../src/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
          debug: true,
        },
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, SeverGateway],
})
export class AppModule { }
