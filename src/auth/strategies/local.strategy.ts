import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserLocal(username, password);
    console.log('local strategy:', user);
    if (!user) {
      if (!user) throw new BadRequestException('User does not exist');
    }
    return user;
  }
}
