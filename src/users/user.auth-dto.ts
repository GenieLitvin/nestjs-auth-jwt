import { IsNotEmpty } from 'class-validator';
export class UserAuthDto {
  @IsNotEmpty()
  username: string;

  displayname: string;
}
