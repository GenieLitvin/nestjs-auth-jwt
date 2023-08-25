import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/google-auth.guard';
import { LocalAuthGuard } from './utils/local-auth.guard';

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
