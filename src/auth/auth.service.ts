import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserAuthDto } from '../users/user.auth-dto';
import { Repository } from 'typeorm';
import { UserLocalDto } from 'src/users/user.local-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(details: UserAuthDto) {
    console.log(details);
    const user = await this.userRepository.findOneBy({
      username: details.username,
    });
    if (user) return user;
    console.log('user creted', details);
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async validateUser2(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signUpUser(userLocalDto: UserLocalDto): Promise<any> {
    const user = await this.userRepository.findOneBy({
      username: userLocalDto.username,
    });
    if (user) return user;
    const newUser = this.userRepository.create(userLocalDto);
    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }
}
