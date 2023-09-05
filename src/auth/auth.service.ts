import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UserAuthDto } from '../users/user.auth-dto';
import { UserLocalDto } from 'src/users/user.local-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(details: UserAuthDto) {
    const user = await this.userRepository.findOneBy({
      username: details.username,
    });
    if (user) return user;
    console.log('user creted', details);
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  //signin local
  async validateUserLocal(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (!match) throw new BadRequestException('Password is incorrect');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async signUpUser(userLocalDto: UserLocalDto): Promise<any> {
    const user = await this.userRepository.findOneBy({
      username: userLocalDto.username,
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // create new user
    userLocalDto.password = await this.hashData(userLocalDto.password);
    const newUser = this.userRepository.create(userLocalDto);
    console.log('createed user', newUser);
    const { id } = await this.userRepository.save(newUser);
    //add refresh token
    const tokens = await this.getTokens(id, newUser.username);
    await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;

    //return this.userRepository.save(newUser);
  }
  async hashData(data: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async findUser(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async logout(userId: string) {
    return this.userRepository.update(userId, { refreshToken: null });
  }

  async signInUser(user: any) {
    console.log('signInUser', user);
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
