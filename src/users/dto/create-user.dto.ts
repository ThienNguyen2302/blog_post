import { Expose } from 'class-transformer';
import { IsEmail ,IsString, Length, IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';

export class CreateUserDto extends BaseDto {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  mail: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @Length(6)
  @Expose()
  password: string;
}