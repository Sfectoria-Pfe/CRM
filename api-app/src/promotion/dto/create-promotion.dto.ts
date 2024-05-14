import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePromotionDto {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  pourcentage: number;
  @ApiProperty()
  @IsNotEmpty()
  date_debut: string;
  
  @ApiProperty()
  @IsNotEmpty()
  opportuniteId : number;
  @ApiProperty()
  @IsNotEmpty()
  categorieClientId: number;
}
