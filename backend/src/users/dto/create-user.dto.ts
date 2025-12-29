import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { AuthProvider } from 'src/enums/authProvider.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password?: string;
  authProvider?: AuthProvider;
}
