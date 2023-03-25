import {
  IsEmail,
  IsNumberString,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsNumberString()
  id: number;

  @Column()
  @IsString()
  @Length(5, 255, {
    message:
      'The name must has a length greater than 5 and less than 255 characters',
  })
  name: string;

  @Column({ unique: true })
  @IsEmail(null, { message: 'Must be a valid email address' })
  email: string;

  @Column()
  @IsString()
  @Length(12, 32, { message: 'The password must be at least 12 characters' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/, {
    message:
      'The password must contain at least one upper case letter, one number and one special character',
  })
  password: string;
}
