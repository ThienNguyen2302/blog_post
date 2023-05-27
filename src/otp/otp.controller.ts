import { Body, Controller, Get, Param, Render } from '@nestjs/common';

enum ValidateType {
    ACTIVATE = "1",
    CHANGE_PASS = "2"
}

@Controller('validate')
export class OtpController {
    //kiểm tra có request otp hay k k thì k vào dc :D
    @Get("/:type")
    @Render("validate")
    async validateForm(
        @Param('type') type: string,
        @Body('otp') otp: string,
    ) {
        if (type === ValidateType.ACTIVATE) {
            //activate code
            console.log("activate account")
        }
        else if (type === ValidateType.CHANGE_PASS) {
            console.log("chang pass request")
        }
        return;
    }

    
}
