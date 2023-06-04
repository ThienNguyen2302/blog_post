import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    public async signIn(pass: string, compare: string) {
        try {
            return await bcrypt.compareSync(pass, compare)  
        } catch (error) {
            throw new Error("Cant verify user acount")
        } 
            
    }

    public signOut() {
        
    }
}
