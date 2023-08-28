import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/user-dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  serializeUser(user: UserDto, done: Function) {
    console.log(user);
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    const user = this.authService.findUser(payload.id);
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
