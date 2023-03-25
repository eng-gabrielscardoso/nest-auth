import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(5, 255, {
    message: 'The name must have a length between 5 and 255 characters',
  })
  @IsOptional()
  name?: string;

  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @IsOptional()
  email?: string;
}
