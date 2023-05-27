import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class LoginDto extends BaseDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @IsNotEmpty()
    @Length(6)
    @Expose()
    password: string;
}