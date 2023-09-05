import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  GetOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
