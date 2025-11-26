import { IsEmail, IsNotEmpty } from 'class-validator';
import { IUser } from '../interfaces/user.interface';
import { Match } from '../../helpers/matchValidator';

export class CreateUserDto implements IUser {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'As senhas devem ser iguais' })
  confirmPassword: string;
}
