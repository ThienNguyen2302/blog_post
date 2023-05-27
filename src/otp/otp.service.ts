import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from './otp.entity';
import { Repository } from 'typeorm';
import * as otpGenerator from 'otp-generator';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { User } from 'src/users/users.entity';


@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(OTP)
        private otpRepository: Repository<OTP>,
        private readonly mailerService: MailerService
    ) { }

    public async create(user: User) {
        let code = this.generateOtp()
        try {
            let otp = await this.otpRepository.upsert({
                userId: user.id,
                password: code,
                expired: new Date((new Date).getTime() + 10 * 60000)
            }, ["userId"])
            if (otp.raw.affectedRows === 1) {
                this.sendEmail(code, user.mail, "activate")
                return true
            }
            return false;
        } catch (error) {
            throw new Error(error)
        }
    }

    public compare(user_id: string) {
        let otp = this.otpRepository.find()
    }

    private generateOtp(length: number = 6): string {
        const otp = otpGenerator.generate(length, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: true,
            specialChars: false,
        });
        return otp;
    }

    private sendEmail(otp: string, email: string, type: string) {

        let subject: string = ""
        let template: string = ""

        switch (type) {
            case "change":
                subject = "Your Validation Code ";
                template = "change_password.hbs";
                break;
            case "activate":
                subject = "Activated Account";
                template = "activate.hbs";
                break;
        }
        
        this.mailerService.sendMail({
            from: '"Noreply" <nguyenngocthien749@gmail.com>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            template: template,
            context: {
                otp: otp,
            }
            // html: template, // html body
        }).then(result => {
            console.log(result)
            return true
        }).catch(error => {
            console.log(error)
            throw new Error(error.message)
        }
        );
    }
}
