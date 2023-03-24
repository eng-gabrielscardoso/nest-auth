import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(5, 255, {
    message: 'The name must have a length between 5 and 255 characters',
  })
  @IsOptional()
  name?: string;

  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @IsOptional()
  email?: string;

  @IsString()
  @Length(12, 32, { message: 'The password must be at least 12 characters' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/, {
    message:
      'The password must contain at least one upper case letter, one number and one special character',
  })
  @IsOptional()
  password?: string;
}
