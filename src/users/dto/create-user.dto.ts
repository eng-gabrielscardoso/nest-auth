import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 255, {
    message: 'The name must have a length between 5 and 255 characters',
  })
  name: string;

  @IsEmail(undefined, { message: 'Must be a valid email address' })
  email: string;

  @IsString()
  @Length(12, 32, { message: 'The password must be at least 12 characters' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/, {
    message:
      'The password must contain at least one upper case letter, one number and one special character',
  })
  password: string;
}
