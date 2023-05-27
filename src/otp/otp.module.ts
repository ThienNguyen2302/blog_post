import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTP } from './otp.entity';
import { OtpController } from './otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OTP])],
  providers: [OtpService],
  exports: [OtpService],
  controllers: [OtpController]
})
export class OtpModule {}
