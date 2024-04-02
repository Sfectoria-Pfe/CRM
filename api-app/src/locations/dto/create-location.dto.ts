import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  nom: string;

  @ApiProperty()
  @IsNotEmpty()
  prix: number;

  @ApiProperty()
  @IsNotEmpty()
  lieu: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  nom_vendeur: string;

  @ApiProperty()
  @IsNotEmpty()
  telephone_vendeur:number;

  @ApiProperty()
  @IsNotEmpty()
  date_debut: Date;

  @ApiProperty()
  @IsNotEmpty()
  date_fin: Date;
}
