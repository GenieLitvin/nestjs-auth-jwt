import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { LocalStrategy } from './utils/local.strategy';
@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, LocalStrategy],
})
export class AuthModule {}
