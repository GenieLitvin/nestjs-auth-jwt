import { Injectable } from '@nestjs/common';
//import { UsersService } from '../users1/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    //private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(): Promise<any> {
    /*const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user; //to do use bcrypt
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }*/
  }
}
