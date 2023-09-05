import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserLocalDto } from 'src/users/user.local-dto';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';

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
  async handleGoogleRedirect(@Req() req) {
    await this.authService.signInUser(req.user);
    return { msg: req.user };
  }

  @Get('github')
  @UseGuards(GithubAuthGuard)
  handleGithubLogin() {
    return { msg: 'Github Auth' };
  }

  @Get('github/redirect')
  @UseGuards(GithubAuthGuard)
  async handleGithubRedirect(@Req() req) {
    await this.authService.signInUser(req.user);
    return { msg: req.user };
  }

  @Post('signup')
  async handleSignUP(@Body() userLocalDto: UserLocalDto) {
    return await this.authService.signUpUser(userLocalDto);
    //return { msg: 'Local Auth' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async handleLocalLogin(@Req() req) {
    return this.authService.signInUser(req.user);
  }

  @Get('status')
  @UseGuards(AccessTokenGuard)
  user(@Req() request: Request) {
    if (request.user) {
      console.log('Auth');
    } else {
      console.log('un auth');
    }
    return;
  }
  /*@Get('local/redirect')
  @UseGuards(AccessTokenGuard)
  handleLocalRedirect() {
    return { msg: 'Local OK' };
  }*/
}
