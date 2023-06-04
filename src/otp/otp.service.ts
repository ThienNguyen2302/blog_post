import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OTP } from './otp.entity';
import { Repository } from 'typeorm';
import * as otpGenerator from 'otp-generator';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { User } from 'src/users/users.entity';

enum otpType {
    ACTIVATE = "1",
    CHANGE_PASS = "2"
}

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
                this.sendEmail(code, user.mail, "1")
                return true
            }
            return false;
        } catch (error) {
            throw new Error(error)
        }
    }

    public async getOTP(user_id) {
        let otp = await this.otpRepository.findOneBy({
            userId: user_id
        })
    }

    public async compare(code: string, user_id: string) {
        let otp = await this.otpRepository.findOneBy({
            userId: user_id
        })
        let time = new Date()
        if (otp.expired < time) {
            return {
                validation: false,
                message: "An OTP has been expired"
            }
        }
        else if (otp.password != code) {
            return {
                validation: false,
                message: "An OTP is unvalid"
            }
        }
        else {
            return {
                validation: true,
                message: "Your OTP is valid"
            }
        }
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

    public async resendOTP(user_id: string, email: string, type: string) {
        let code = this.generateOtp()
        try {
            let otp = await this.otpRepository.upsert({
                userId: user_id,
                password: code,
                expired: new Date((new Date).getTime() + 10 * 60000)
            }, ["userId"])
            if (otp.raw.affectedRows !== 0) {
                return this.sendEmail(code, email, type)
            }
            return false;
        } catch (error) {
            throw new Error(error)
        }
    }

    public async validateOTP(userId: string, code: string) {
        try {
            let otp = await this.otpRepository.findOneBy({
                userId: userId,
            });
            let time = new Date();

            if (!otp) {
                return false;
            }
            else if (otp.expired < time) {
                return false;
            }
            else if (otp.password === code) {
                return true;
            }

        } catch (error) {
            throw new Error(error)
        }
        return false
    }

    private sendEmail(otp: string, email: string, type: string) {

        let subject: string = ""
        let template: string = ""

        switch (type) {
            case otpType.ACTIVATE:
                subject = "Activated Account";
                template = "activate.hbs";
                break;
            case otpType.CHANGE_PASS:
                subject = "Your Validation Code ";
                template = "change_password.hbs";
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
            return true
        }).catch(error => {
            throw new Error(error.message)
        }
        );
    }
}
