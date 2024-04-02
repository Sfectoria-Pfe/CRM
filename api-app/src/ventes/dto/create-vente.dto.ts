import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber,IsDateString } from "class-validator";

export class CreateVenteDto {

  @ApiProperty()
  @IsNotEmpty()
  nom: string;
  @IsNumber()
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
  @IsDateString()
  @ApiProperty()
  @IsNotEmpty()
  date_vente: string;

  @ApiProperty()
  @IsNotEmpty()
  nom_vendeur: string;
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  telephone_vendeur: number; 
}
