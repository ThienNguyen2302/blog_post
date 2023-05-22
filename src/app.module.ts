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

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PostsModule,
    ReactionsModule,
    ConfigModule.forRoot({
      isGlobal: true
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
      synchronize: true,
    }),
    OtpModule
  ],
  controllers: [AppController],
  providers: [AppService, SeverGateway],
})
export class AppModule { }
