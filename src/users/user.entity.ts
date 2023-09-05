import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  displayname: string;

  @Column({ nullable: true })
  refreshToken: string;
}
