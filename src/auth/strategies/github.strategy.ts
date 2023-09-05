import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:${process.env.NODE_PORT}/api/auth/github/redirect`,
      scope: ['user:email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUser({
      username: profile.emails[0].value,
      displayname: profile['_json'].login,
    });
    return user || null;
  }
}
