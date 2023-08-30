import { IsNotEmpty } from 'class-validator';
export class UserLocalDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
