import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Inject, Injectable } from '@nestjs/common';
//import { UserDto } from 'src/users/user.local-dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    done(null, user);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    const user = this.authService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
