import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserDto } from '../users/user-dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(details: UserDto) {
    const user = await this.userRepository.findOneBy({ email: details.email });
    if (user) return user;
    console.log('user creted');
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }
  async findUser(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }
}
