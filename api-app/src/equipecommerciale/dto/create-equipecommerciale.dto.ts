import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateEquipecommercialeDto {
  @ApiProperty()
  @IsNotEmpty()
  nom_equipe: string;
  @ApiProperty()
  @IsArray()
  memberIds: number[];

  @ApiProperty()
  @IsNotEmpty() // Clé étrangère vers l'id de l'entité Admin
  chefId: number; // Clé étrangère vers l'id de l'entité Chef
}
