import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-auth.guard';
import { LocalAuthGuard } from './utils/local-auth.guard';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
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

  @Get('local/redirect')
  @UseGuards(LocalAuthGuard)
  handleLocalRedirect() {
    return { msg: 'Local OK' };
  }

  @Get('facebook')
  handleFacebookLogin() {
    return { msg: 'Facebook Auth' };
  }

  @Get('facebook/redirect')
  handleFacebookRedirect() {
    return { msg: 'Facebook OK' };
  }
}
