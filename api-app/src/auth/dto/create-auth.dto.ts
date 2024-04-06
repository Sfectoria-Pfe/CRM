import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateAuthDto {}
export class LoginDto {
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
export class SignupDto {
  nom: string;
  prenom: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  adresse: string;
  telephone: number;
  password: string;
  image?: string;
}
