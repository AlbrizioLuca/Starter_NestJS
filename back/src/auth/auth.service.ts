import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneBy(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!await bcrypt.compare(pass, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id,};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}