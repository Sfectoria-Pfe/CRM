import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
    
    @ApiProperty()
  @IsNotEmpty()
    nom: string;

    @ApiProperty()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty()
  @IsNotEmpty()
  telephone: number;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  categorieId?: number;
  @ApiProperty()
  @IsNotEmpty()
  image     ? : string 
}
