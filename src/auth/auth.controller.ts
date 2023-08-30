import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-auth.guard';

import { LocalAuthGuard } from './utils/local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserLocalDto } from 'src/users/user.local-dto';
import { GithubAuthGuard } from './utils/github-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  handleGoogleLogin() {
    return { msg: 'Google Auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect() {
    return { msg: 'Google OK' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      console.log('Auth');
    } else {
      console.log('un auth');
    }
    return;
  }

  @Post('local')
  @UseGuards(LocalAuthGuard)
  handleLocalLogin() {
    return { msg: 'Local Auth' };
  }

  @Post('signup')
  async handleSignUP(@Body() userLocalDto: UserLocalDto) {
    return await this.authService.signUpUser(userLocalDto);
    //return { msg: 'Local Auth' };
  }

  @Get('local/redirect')
  @UseGuards(LocalAuthGuard)
  handleLocalRedirect() {
    return { msg: 'Local OK' };
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  handleGithubLogin() {
    return { msg: 'Github Auth' };
  }

  @Get('github/redirect')
  @UseGuards(GithubAuthGuard)
  handleGithubRedirect() {
    return { msg: 'Github OK' };
  }
}
