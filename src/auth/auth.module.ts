import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { SessionSerializer } from './strategies/serializer';
import { GithubStrategy } from './strategies/github.strategy';

import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    LocalStrategy,
    GithubStrategy,
    SessionSerializer,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthService,
  ],
})
export class AuthModule {}
